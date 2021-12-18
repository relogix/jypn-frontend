import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { BsArrowLeft } from "react-icons/bs";
import ProgressiveImage from "react-progressive-image";
import { Link } from "react-router-dom";
import DynamicComponent from "../../../../../components/DynamicComponent";
import { publicRouteSlug } from "../../../../../routes/publicRoutes";

const DesktopVersion = ({ member, memberName, sections }) => {
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);

  // Wheel Listener
  const [direction, setDirection] = useState(1);
  const handleWheel = (e) => {
    const newDirection = e?.deltaY >= 0 ? 1 : -1;
    setDirection(newDirection);

    if (activeSectionIndex + newDirection >= 0 && activeSectionIndex + newDirection < sections.length)
      setActiveSectionIndex(activeSectionIndex + newDirection);
  };

  return (
    <div className="h-screen grid grid-cols-2" onWheel={handleWheel}>
      <div
        className="flex justify-center items-center p-12 px-20 bg-gradient-dark"
        style={{ backgroundSize: "70% 100%", backgroundRepeat: "no-repeat", height: "inherit" }}
      >
        <div className="flex justify-center w-full bg-gray-100" style={{ borderRadius: "1.5rem", height: "100%" }}>
          <ProgressiveImage
            src={`${member?.attributes?.coverImages?.data[activeSectionIndex]?.attributes?.url}`}
            placeholder={`${member?.attributes?.coverImages?.data[activeSectionIndex]?.attributes?.formats?.thumbnail?.url}`}
          >
            {(src) => (
              <img
                src={src}
                className="w-full object-cover object-top"
                style={{ borderRadius: "1.5rem", maxHeight: "100%" }}
                alt=""
              />
            )}
          </ProgressiveImage>
        </div>
      </div>
      <div className="py-12 pr-20 flex flex-col justify-between">
        <div className="flex justify-between">
          <div>
            <Link to={publicRouteSlug.MEMBERS}>
              <div className="p-2 bg-gray-100 rounded-full">
                <BsArrowLeft className="text-lg text-black" />
              </div>
            </Link>
          </div>
          <div>
            <Link to={publicRouteSlug.HOME}>
              <h1 className="text-2xl font-bold">JYPn</h1>
            </Link>
          </div>
        </div>
        <div className="flex justify-between">
          <div className={activeSectionIndex !== 0 ? "hidden" : undefined} />
          <AnimatePresence>
            <DynamicComponent component={sections[activeSectionIndex].Component} direction={direction} data={member} />
          </AnimatePresence>
          <div className="flex flex-col justify-center gap-y-3">
            {sections.map((section, iSection) => (
              <button
                key={iSection}
                className={`w-2 h-2 rounded-full bg-gray-300 ${
                  iSection === activeSectionIndex ? "bg-gray-500" : undefined
                } hover:bg-gray-400`}
                onClick={() => setActiveSectionIndex(iSection)}
              />
            ))}
          </div>
        </div>
        <div className="flex justify-end h-6">
          {activeSectionIndex !== 0 && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`italic tracking-wider font-medium`}
            >
              <motion.span
                key={sections[activeSectionIndex].name}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-light"
              >
                {sections[activeSectionIndex].name}
              </motion.span>{" "}
              / {memberName}
            </motion.p>
          )}
        </div>
      </div>
    </div>
  );
};

export default DesktopVersion;
