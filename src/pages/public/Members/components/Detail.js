import { useContext } from "react";
import { useHistory, useParams } from "react-router";
import { Link } from "react-router-dom";
import { Context } from "../controllers/Controller";
import Button from "../../../../components/inputForm/Button";
import { BiLeftArrowAlt } from "react-icons/bi";
import { motion } from "framer-motion";
import LongDotGroup from "../../../../assets/img/components/long-dot-group.png";
import moment from "moment";

const BackButton = ({ className }) => {
  const history = useHistory();

  return (
    <div className={`${className}`}>
      <Link to="#" onClick={() => history.goBack()}>
        <Button className="flex items-center">
          <BiLeftArrowAlt className="mr-1 text-lg" /> Back
        </Button>
      </Link>
    </div>
  );
};

const Detail = () => {
  const { member: memberName } = useParams();
  const { members } = useContext(Context);
  const activeMember = members.find((member) => member.nickname === memberName);

  return (
    <div className="relative w-full h-full" style={{ zIndex: "1" }}>
      <div className="hidden md:absolute bg-gray-500 bg-opacity-5 h-full w-1/4" style={{ zIndex: "-1" }}></div>
      <div className="p-6 md:p-12 md:py-10 h-full">
        <div className="flex flex-col md:flex-row gap-12 gap-y-4 h-full">
          <BackButton className="md:hidden" />
          <motion.img
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:w-1/3 object-cover object-top rounded-lg bg-gray-500"
            src={activeMember?.images[0]}
          />

          <div className="flex-1 flex flex-col justify-between ">
            <BackButton className="hidden md:inline" />

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="flex my-4 md:m-0 ">
              <div>
                <h1 className="text-4xl md:text-5xl font-light uppercase">{activeMember?.nickname}</h1>
                <div className="flex items-center">
                  <div className="my-2 w-1/2 bg-white" style={{ height: "1px" }} />
                  <div className="w-1 h-1 rounded-full bg-white" />
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
              <table>
                <tbody>
                  {[
                    [
                      "Full Name",
                      `${activeMember?.firstName || ""} ${activeMember?.middleName || ""} ${
                        activeMember?.lastName || ""
                      }`,
                    ],
                    ["Korean Name", activeMember?.koreanName],
                    ["Birth Date", moment(new Date(activeMember?.birthdate)).format("MMMM DD YYYY")],
                    [
                      "Birth Place",
                      <div>
                        {activeMember?.birthPlace?.split(", ")[0]},
                        <br />
                        {activeMember?.birthPlace?.split(", ")[1]}
                      </div>,
                    ],
                  ].map((description, iDescription) => (
                    <tr key={iDescription}>
                      <td className="p-1 px-4 pl-0 font-semibold flex">{description[0]}</td>
                      <td className="p-1 px-4 ">{description[1]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          </div>
          <div className="hidden md:flex items-center">
            <img style={{ height: "60%" }} src={LongDotGroup} alt="Long Dot Group" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
