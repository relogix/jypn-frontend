import ContentHeader from "../../../../components/ContentHeader";
import Button from "../../../../components/inputForm/Button";
import PreviewCard from "../../../../components/PreviewCard";
import Update1 from "../../../../assets/img/update/update-1.jpg";
import { useHistory } from "react-router";
import { publicRouteSlug } from "../../../../router/publicRoute";
import { Context } from "../controllers/Controller";
import { useContext } from "react";
import { stringToURL } from "../../../../utils/string.util";
import ProgressiveImage from "react-progressive-image";

const Updates = () => {
  const history = useHistory();
  const { updates, loadingUpdates } = useContext(Context);

  return (
    <div className="px-6 md:px-12 py-8 ">
      <div className="flex justify-between items-center mb-8">
        <ContentHeader className="flex-1">More Updates</ContentHeader>
        <Button onClick={() => history.push(publicRouteSlug.UPDATES)}>See More</Button>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {loadingUpdates
          ? ["", "", ""].map((_, iComp) => <PreviewCard key={iComp} loading />)
          : updates.slice(2, 5).map((update, iUpdate) => (
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
      </div>
    </div>
  );
};

export default Updates;
