import { Link } from "react-router-dom";
import { HiMenuAlt1, HiOutlineLogout } from "react-icons/hi";
import { Drawer, Nav } from "rsuite";
import { useContext, useState } from "react";
import { adminRouteSlug } from "../../../router/adminRoute";
import { useSelector } from "react-redux";
import { AuthContext } from "../../../controllers/AuthController";

const MobileSidebar = ({ open, setClose }) => {
  const { handleLogout } = useContext(AuthContext);
  const sidebarItems = useSelector((state) => state.admin.sidebar.items);

  return (
    <Drawer className="drawer-dark" open={open} full onClose={setClose}>
      <Drawer.Body>
        <div className="w-full h-full flex items-center ">
          <ul className="w-full">
            {sidebarItems.map((item, iItem) => (
              <li key={iItem}>
                <Link to={item.path} onClick={() => setClose(true)}>
                  <div className="flex items-center" style={{ borderBottom: "1px solid gray" }}>
                    <item.Icon className="mr-3 text-xl" />
                    <h1 className="font-light poppins text-xl my-4">{item.label}</h1>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <div />
          <button className="flex items-center p-4 py-2 bg-white bg-opacity-10" onClick={handleLogout}>
            <HiOutlineLogout className="mr-2" /> Logout
          </button>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

const Navbar = ({}) => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const { userData, handleLogout } = useContext(AuthContext);

  return (
    <div
      className="flex-none w-full h-16 md:px-8 px-6 flex items-center justify-between"
      style={{ backgroundColor: "#181818", zIndex: 1000 }}
    >
      <div>
        <Link to={adminRouteSlug.DASHBOARD} style={{ fontFamily: "Poppins" }} className="text-xl font-bold">
          JYPn <span className="md:hidden font-light text-xs ml-1 tracking-widest">ADMIN</span>
        </Link>
      </div>

      <div>
        <div className="md:hidden">
          <button onClick={() => setMobileSidebarOpen(true)}>
            <HiMenuAlt1 className="text-xl" />
          </button>

          <MobileSidebar open={isMobileSidebarOpen} setClose={() => setMobileSidebarOpen(false)} />
        </div>
        <div className="text-sm hidden md:inline">
          <Nav>
            <Nav.Dropdown title={userData?.adminName}>
              <Nav.Dropdown.Item onSelect={handleLogout}>Logout</Nav.Dropdown.Item>
            </Nav.Dropdown>
          </Nav>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
