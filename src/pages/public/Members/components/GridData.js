import { useContext, useEffect, useState } from "react";
import { Context } from "../controllers/Controller";
import { AnimatePresence, motion } from "framer-motion";
import ArrowTopRightDot from "../../../../assets/img/components/arrow-top-right-dot.png";
import { Loader } from "rsuite";
import { Link } from "react-router-dom";
import { publicRouteSlug } from "../../../../router/publicRoute";
import ContentHeader from "../../../../components/ContentHeader";

const MemberCard = ({ member, onHover = () => "" }) => {
  const [isHover, setHover] = useState(false);
  useEffect(() => {
    onHover(isHover && member);
  }, [isHover]);

  return (
    <Link to={`${publicRouteSlug.MEMBERS_DETAIL}/${member?.nickname}`} style={{ border: "1px solid #777" }}>
      <div className="md:h-60 border-none">
        <img
          className={`w-full h-full object-cover ${!isHover && "filter"} grayscale md:opacity-60 hover:opacity-100`}
          src={member?.previewImg}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        />
      </div>
      <div className="md:hidden">
        <h3 className=" px-4 py-2 w-full font-light text-right uppercase" style={{ letterSpacing: "0.2rem" }}>
          {member?.nickname}
        </h3>
      </div>
    </Link>
  );
};

const GridData = () => {
  const { members, loadingMembers } = useContext(Context);
  const [activeMember, setActiveMember] = useState();

  return (
    <div className="p-8 md:p-12 md:py-10 h-full">
      <AnimatePresence>
        {loadingMembers ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="h-80 flex justify-center items-center"
          >
            <Loader size="md" />
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid md:grid-cols-5 gap-y-10 md:gap-6"
          >
            <ContentHeader className="md:hidden text-2xl">Our Precious Angels</ContentHeader>
            {members.slice(0, 4).map((member, iMember) => (
              <MemberCard key={iMember} member={member} onHover={setActiveMember} />
            ))}
            <div className="hidden md:flex justify-end">
              <div className="w-1/3">
                <img src={ArrowTopRightDot} alt="Long Dot Group" />
              </div>
            </div>
            <div className="hidden md:flex md:col-span-2 p-4 items-end">
              <AnimatePresence>
                {!activeMember ? (
                  <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="poppins font-extralight italic uppercase md:text-2xl lg:text-4xl inline-block"
                    style={{ letterSpacing: "0.5rem", maxWidth: "min-content" }}
                  >
                    Our Precious{" "}
                    <span
                      className="font-semibold text-5xl"
                      style={{ letterSpacing: "0.1rem", maxWidth: "min-content" }}
                    >
                      Angels
                    </span>
                  </motion.h1>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col"
                  >
                    <span className="text-lg" style={{ letterSpacing: "0.1rem" }}>
                      {activeMember?.koreanName}
                    </span>
                    <h1 className="md:text-4xl lg:text-6xl uppercase"> {activeMember?.nickname}</h1>
                    <div className="flex justify-end items-center">
                      <div className="my-2 w-1/2 bg-red-100" style={{ height: "1px" }} />
                      <div className="w-1 h-1 rounded-full bg-white" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {members.slice(4, 7).map((member, iMember) => (
              <MemberCard key={iMember} member={member} onHover={setActiveMember} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GridData;
