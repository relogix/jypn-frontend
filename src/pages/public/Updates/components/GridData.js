import { useContext } from "react";
import Button from "../../../../components/inputForm/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PreviewCard from "../../../../components/PreviewCard";
import { GridContext } from "../controllers/GridController";
import ProgressiveImage from "react-progressive-image";
import { stringToURL } from "../../../../utils/string.util";
import { publicRouteSlug } from "../../../../router/publicRoute";
import { motion } from "framer-motion";
import { useRef } from "react";
import { Loader } from "rsuite";

const GridData = () => {
  const history = useHistory();
  const { updates, loadingUpdates, setReloadUpdates } = useContext(GridContext);

  // Infinite Scroll Trigger
  const divRef = useRef();
  window.onscroll = () => {
    if (divRef.current) {
      const isReload =
        window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 1;
      isReload && setReloadUpdates(true);
    }
  };

  return (
    <motion.div ref={divRef} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex justify-between mb-6">
        <Link to="#" onClick={() => history.goBack()}>
          <Button className="flex items-center">
            <BiLeftArrowAlt className="mr-1 text-lg" /> Back
          </Button>
        </Link>
      </div>
      <div className="grid md:grid-cols-3 gap-6">
        {updates.map((update, iUpdate) => (
          <PreviewCard
            key={iUpdate}
            title={update.title}
            date={update.createdAt}
            path={`${publicRouteSlug.UPDATES_DETAIL}/${update.updateCode}/${stringToURL(update?.title)}`}
            dotPulse={iUpdate < 2}
          >
            {update.thumbnailUrl ? (
              <ProgressiveImage src={update.thumbnailUrl} placeholder={update.lowThumbnailUrl}>
                {(src) => <img src={src} className="object-cover" style={{ aspectRatio: "1920/1080" }} />}
              </ProgressiveImage>
            ) : (
              update.content
            )}
          </PreviewCard>
        ))}
        {loadingUpdates && (
          <div className="col-span-3 flex justify-center">
            <Loader size="md" />
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default GridData;
