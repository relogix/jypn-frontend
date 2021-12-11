import { BsTwitter } from "react-icons/bs";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="text-white p-8 flex justify-between gap-8" style={{ backgroundColor: "#151515" }}>
      <div>JYPn Fans Website © 2021</div>
      <div className="text-xl">
        <Link to="#">
          <BsTwitter />
        </Link>
      </div>
    </div>
  );
};

export default Footer;
