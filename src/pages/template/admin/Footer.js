import { FaHeart } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="px-12 py-8 flex justify-between items-center"
      style={{ backgroundColor: "#181818", fontSize: "0.6rem" }}
    >
      <div className="uppercase tracking-widest flex items-center">
        <span>Made By Love</span>
        <FaHeart className="mx-2" />
        <span>2021 {new Date().getFullYear() != "2021" && `- ${new Date().getFullYear()}`}</span>
      </div>
    </div>
  );
};

export default Footer;
