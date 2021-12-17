import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-white p-8 flex justify-between items-center gap-8" style={{ backgroundColor: "#151515" }}>
      <div>
        <h1 className="text-lg font-bold">JYPn Fans Website</h1>
        <p className="text-xs font-light">Made By JYPn Global Fans</p>
      </div>
      <div className="text-2xl">
        <Link to="//twitter.com/JYPnGLOBAL_" target="_blank">
          <BsTwitter />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
