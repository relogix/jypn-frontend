import { useContext } from "react";
import Button from "../../../../components/inputForm/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PreviewCard from "../../../../components/PreviewCard";
import GridController, { GridContext } from "../controllers/GridController";
import ProgressiveImage from "react-progressive-image";
import { stringToURL } from "../../../../utils/string.util";
import { publicRouteSlug } from "../../../../router/publicRoute";
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
    <div ref={divRef}>
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
          >
            {update.thumbnailUrl ? (
              <ProgressiveImage src={update.thumbnailUrl} placeholder={update.lowThumbnailUrl}>
                {(src) => <img src={src} className="object-cover" style={{ aspectRatio: "1920/1080" }} />}
              </ProgressiveImage>
            ) : (
              <p className="h-full whitespace-pre-wrap truncate">{update.content}</p>
            )}
          </PreviewCard>
        ))}
        {loadingUpdates && (
          <div className="col-span-3 flex justify-center">
            <Loader size="md" />
          </div>
        )}
      </div>
    </div>
  );
};

export default GridData;
