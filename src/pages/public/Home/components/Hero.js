import ProgressiveImage from "react-progressive-image";
import Hero1 from "../../../../assets/img/hero/hero-1.jpg";
import ThreeArrowDown from "../../../../assets/img/components/three-arrow-down.png";
import PreviewCard from "../../../../components/PreviewCard";
import Divider, { VerticalDivider } from "../../../../components/Divider";
import Controller, { Context } from "../controllers/Controller";
import { useContext } from "react";
import { publicRouteSlug } from "../../../../router/publicRoute";
import { stringToURL } from "../../../../utils/string.util";
import { Loader } from "rsuite";

const Hero = () => {
  const { updates, loadingUpdates } = useContext(Context);

  return (
    <div className="w-full relative" style={{ minHeight: "100vh", zIndex: 1 }}>
      <ProgressiveImage src={Hero1}>
        {(src) => (
          <img
            src={src}
            style={{ zIndex: -1 }}
            alt="Hero-1"
            className="w-full h-full opacity-20 absolute object-cover"
          />
        )}
      </ProgressiveImage>

      <div className="px-6 md:px-12 py-8 grid md:grid-cols-3 h-full gap-y-36 md:gap-y-0">
        <div className="md:col-span-2 grid h-full gap-y-36 md:gap-0">
          <div>
            <span className="font-light text-2xs" style={{ letterSpacing: "0.4rem" }}>
              JYPN FANS WEBSITE
            </span>
          </div>
          <div className="flex items-center">
            <span className="poppins">
              <h1 className="m-0 p-0 leading-none text-2xl md:text-5xl">YOUR NEXT FAVORITE</h1>
              <h1 className="m-0 p-0 leading-none text-outline text-transparent text-4xl md:text-7xl">GIRL GROUP</h1>
            </span>
          </div>
          <div className="hidden md:flex items-end">
            <img className="h-8" src={ThreeArrowDown} alt="Arrow Down" />
          </div>
        </div>
        <div className="flex flex-col-reverse md:flex-row gap-8 mb-10 md:mb-0">
          <div className="flex-1 grid gap-6 md:gap-4">
            {loadingUpdates ? (
              <>
                <PreviewCard loading />
                <PreviewCard loading />
              </>
            ) : (
              updates.slice(0, 2).map((update, iUpdate) => (
                <PreviewCard
                  key={iUpdate}
                  title={update.title}
                  date={update.createdAt}
                  path={`${publicRouteSlug.UPDATES_DETAIL}/${update.updateCode}/${stringToURL(update?.title)}`}
                  dotPulse
                >
                  {update.thumbnailUrl ? (
                    <ProgressiveImage src={update.thumbnailUrl} placeholder={update.lowThumbnailUrl}>
                      {(src) => <img src={src} className="object-cover" style={{ aspectRatio: "1920/1080" }} />}
                    </ProgressiveImage>
                  ) : (
                    update.content
                  )}
                </PreviewCard>
              ))
            )}
          </div>
          <VerticalDivider className="hidden md:flex">Latest Update</VerticalDivider>
          <Divider className="md:hidden">Latest Update</Divider>
        </div>
      </div>
    </div>
  );
};

export default Hero;
