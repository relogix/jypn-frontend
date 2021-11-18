import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="px-12 py-8 flex justify-between items-center"
      style={{ backgroundColor: "#181818", fontSize: "0.6rem" }}
    >
      <span className="uppercase tracking-widest">Managed By - JYPN GLOBAL FANBASE</span>
      <div>
        <Link className="p-2" to="//twitter.com/JYPnGLOBAL_" target="_blank">
          <BsTwitter className="text-xl" />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
