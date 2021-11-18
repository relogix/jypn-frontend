import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { adminRouteSlug } from "../../../router/adminRoute";
import { useLocation } from "react-router";

const AdminTemplateWrapper = ({ children }) => {
  const location = useLocation();

  // Hide Template For These Pages
  const templateException = [adminRouteSlug.LOGIN];
  const [isTemplateShow, setTemplateShow] = useState(false);
  useEffect(() => {
    setTemplateShow(!templateException.includes(location.pathname));
  }, [location]);

  return isTemplateShow ? (
    <div className="md:h-screen flex">
      <div className={`w-60 hidden md:inline overflow-auto`} style={{ backgroundColor: "#222" }}>
        <Sidebar />
      </div>
      <div className="flex-1 h-full flex flex-col md:overflow-auto relative">
        <Navbar />
        <div className="flex-1 overflow-auto">{children}</div>
        <Footer />
      </div>
    </div>
  ) : (
    <div>{children}</div>
  );
};

export default AdminTemplateWrapper;
