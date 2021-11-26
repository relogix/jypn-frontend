import { useEffect, useState } from "react";
import ProgressiveImage from "react-progressive-image";
import { Link } from "react-router-dom";
import { Loader } from "rsuite";
import { youtubeLink } from "../../utils/string.util";

const PreviewCard = ({ title = "", date = "", dotPulse = false, path = "#", loading = false, children }) => {
  const [youtubeEmbedId, setYoutubeEmbedId] = useState();
  useEffect(() => {
    typeof children === "string" && setYoutubeEmbedId(youtubeLink(children));
  }, [children]);
  return (
    <Link
      className="w-full flex flex-col relative bg-white bg-opacity-10 hover:bg-opacity-20 transition-all rounded-xl p-4 px-5 backdrop-filter backdrop-blur-xs"
      to={path}
    >
      {dotPulse && (
        <div className="absolute -top-1 -right-1 flex">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
        </div>
      )}

      <h3 className="poppins font-medium text-sm truncate">{title}</h3>
      <p className={`font-light opacity-60 italic my-1 mb-2`} style={{ fontSize: "0.7rem" }}>
        {date}
      </p>
      {loading ? (
        <div className="flex justify-center my-20">
          <Loader size="md" />
        </div>
      ) : (
        <div className="flex-1 flex items-center">
          <div
            className="w-full rounded-md overflow-hidden h-full whitespace-pre-wrap truncate"
            style={{ maxHeight: "200px" }}
          >
            {youtubeEmbedId ? (
              <ProgressiveImage src={`https://i.ytimg.com/vi/${youtubeEmbedId}/mqdefault.jpg`}>
                {(src) => <img src={src} className="w-full object-cover" style={{ aspectRatio: "1920/1080" }} />}
              </ProgressiveImage>
            ) : (
              children
            )}
          </div>
        </div>
      )}
    </Link>
  );
};

export default PreviewCard;
