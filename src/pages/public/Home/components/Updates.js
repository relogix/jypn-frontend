import { Popover, PopoverContent, PopoverTrigger, Spinner, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineReload } from "react-icons/ai";
import moment from "moment";
import ProgressiveImage from "react-progressive-image";

const UpdateCard = ({ isLoading = false, isError = false, reload = () => "", title, postDate, url, youtubeId }) => {
  return isLoading ? (
    <div className="bg-gray-200 h-60 bg-opacity-40 rounded-md flex justify-center items-center">
      <Spinner />
    </div>
  ) : isError ? (
    <Link to="#" onClick={reload}>
      <div className="bg-gray-200 h-60 bg-opacity-40 rounded-md flex flex-col justify-center items-center gap-2 text-gray-500">
        <AiOutlineReload className="text-3xl" />
        <span className="text-sm">Data not fetched. Click to reload</span>
      </div>
    </Link>
  ) : (
    <Link to={`//${url}`} target="_blank">
      <Popover trigger="hover">
        <PopoverTrigger>
          <motion.div
            whileHover={{ x: -5, y: -10 }}
            className="bg-gradient-primary rounded-lg shadow-md p-4 flex flex-col gap-2"
          >
            <div className="flex justify-between md:items-center">
              <h2 className="font-semibold md:truncate">{title}</h2>
              <span className="text-xs italic">{postDate}</span>
            </div>
            <div className="rounded-md bg-white overflow-hidden">
              <ProgressiveImage
                src={`https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`}
                placeholder={`https://i.ytimg.com/vi/${youtubeId}/sddefault.jpg`}
              >
                {(src) => <img src={src} alt="" />}
              </ProgressiveImage>
            </div>
          </motion.div>
        </PopoverTrigger>
        <PopoverContent style={{ backgroundColor: "#222" }}>
          <div className="p-2 text-sm text-white">{title}</div>
        </PopoverContent>
      </Popover>
    </Link>
  );
};

const Updates = () => {
  const [updates, setUpdates] = useState([]);
  const [reloadUpdates, setReloadUpdates] = useState(true);
  const [errorUpdates, setErrorUpdates] = useState(false);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  useEffect(() => {
    let mounted = true;

    const getUpdates = () => {
      setErrorUpdates(false);
      setLoadingUpdates(true);

      axios
        .get("/api/updates/latest")
        .then((res) => {
          if (mounted) {
            setUpdates(res.data?.events.slice(0, 3));
          }
        })
        .catch(() => {
          setErrorUpdates(true);
        })
        .finally(() => {
          setLoadingUpdates(false);
          setReloadUpdates(false);
        });
    };

    reloadUpdates && getUpdates();

    return () => {
      mounted = false;
    };
  }, [reloadUpdates]);

  return (
    <div className="-mt-48 md:-mt-32 px-10 md:px-16 grid md:grid-cols-3 md:gap-y-4 gap-8" style={{ zIndex: 1 }}>
      <div className="md:col-span-3 text-center">
        <span className="text-gray-300 uppercase italic" style={{ fontSize: "0.6rem", letterSpacing: "0.2rem" }}>
          Latest Update
        </span>
      </div>
      {loadingUpdates ? (
        [1, 2, 3].map((_, i) => <UpdateCard key={i} isLoading />)
      ) : errorUpdates ? (
        <div className="md:col-span-3">
          <UpdateCard isError reload={() => setReloadUpdates(true)} />
        </div>
      ) : (
        updates.map((update, iUpdate) => (
          <UpdateCard
            key={iUpdate}
            title={update?.title}
            postDate={moment(update?.start?.dateTime).format("YYYY/MM/DD")}
            url={update?.youtube?.url}
            youtubeId={update?.youtube?.id}
          />
        ))
      )}
    </div>
  );
};

export default Updates;
