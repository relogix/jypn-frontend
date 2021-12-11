import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Spinner } from "@chakra-ui/spinner";
import { publicRouteSlug } from "../../../../routes/publicRoutes";

const MemberCover = ({ isLogoShow = false }) => {
  // Title
  const defaultTitle = "Our Precious Angels";
  const [title, setTitle] = useState(defaultTitle);

  // Members
  const [members, setMembers] = useState([]);
  const [memberLoading, setMemberLoading] = useState(false);
  useEffect(() => {
    let mounted = true;
    setMemberLoading(true);

    axios.get("/api/members?populate=*").then((res) => {
      if (mounted) {
        setMembers(res.data?.data);
        setMemberLoading(false);
      }
    });

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="p-8 py-12 md:p-20 md:pt-8 md:pb-16 flex flex-col gap-y-10 md:gap-0 bg-gradient-dark text-white">
      <div className={`font-bold text-xl md:mb-8 ${!isLogoShow && "md:mb-20"}`}>
        <Link className={`${!isLogoShow && "hidden"}`} to={publicRouteSlug.HOME}>
          JYPn
        </Link>
      </div>
      <div className={`pb-20 md:p-0 grid md:grid-cols-${members.length || "1"} gap-x-8 gap-y-32 order-4 md:order-2`}>
        {memberLoading ? (
          <div className="w-full h-96 flex justify-center items-center">
            <Spinner size="xl" />
          </div>
        ) : (
          members.map((member, iMember) => (
            <motion.div
              key={iMember}
              className="h-96 filter hover:filter grayscale brightness-75 hover:grayscale-0 hover:brightness-100"
              whileHover={{
                y: -20,
              }}
              onHoverStart={() => setTitle(member?.attributes?.name)}
              onHoverEnd={() => setTitle(defaultTitle)}
            >
              <Link className="bg-red-100 h-full" to={`${publicRouteSlug.MEMBER}${member?.attributes?.name}`}>
                <div className="md:hidden py-4 flex items-center gap-10">
                  <h3 className="font-semibold text-3xl">{member?.attributes?.name}</h3>
                  <div className="flex-1 h-1" style={{ borderBottom: "1px solid white" }}></div>
                </div>
                <img
                  src={`${member?.attributes?.previewImage?.data?.attributes?.url}`}
                  className="w-full h-full object-cover object-top"
                />
              </Link>
            </motion.div>
          ))
        )}
      </div>
      <div className="md:mt-8 order-3">
        <hr className="hidden md:flex" />
        <div className="mt-4 flex justify-between">
          <motion.h2
            key={title}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-1 font-semibold md:font-bold text-4xl md:text-6xl md:uppercase poppins bg-clip-text text-white md:text-transparent bg-gradient-primary"
          >
            {title}
          </motion.h2>
          <p className={`${title === defaultTitle && "hidden"} italic text-gray-300`}>Our Precious Angels</p>
        </div>
      </div>
    </div>
  );
};

export default MemberCover;
