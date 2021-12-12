import { BsArrowLeft } from "react-icons/bs";
import ProgressiveImage from "react-progressive-image";
import { Link } from "react-router-dom";
import DynamicComponent from "../../../../../components/DynamicComponent";
import { publicRouteSlug } from "../../../../../routes/publicRoutes";

const MobileVersion = ({ member, memberName, sections }) => {
  return (
    <div className="flex flex-col gap-y-2">
      <div
        className="flex flex-col bg-gradient-dark px-8 py-8 text-white"
        style={{ height: "80vh", backgroundSize: "100% 80%", backgroundRepeat: "no-repeat" }}
      >
        <div className="flex mb-8">
          <Link to={publicRouteSlug.MEMBERS}>
            <div className="p-2 bg-white bg-opacity-20 rounded-full">
              <BsArrowLeft className="text-lg text-white" />
            </div>
          </Link>
        </div>
        <ProgressiveImage
          src={`${member?.attributes?.coverImages?.data[2]?.attributes?.url}`}
          placeholder={`${member?.attributes?.coverImages?.data[2]?.attributes?.formats?.thumbnail?.url}`}
        >
          {(src) => (
            <img
              src={src}
              className="w-full h-full object-cover object-top"
              style={{ borderRadius: "1rem", maxHeight: "100%" }}
              alt=""
            />
          )}
        </ProgressiveImage>
      </div>
      {sections.map((section, iSection) => (
        <div key={iSection} className="px-8 mb-8">
          <DynamicComponent component={section?.Component} data={member} />
        </div>
      ))}
    </div>
  );
};

export default MobileVersion;
