import { Link } from "react-router-dom";
import { HiMenuAlt1 } from "react-icons/hi";
import { Drawer } from "rsuite";
import { useState } from "react";
import { useSelector } from "react-redux";

const MobileSidebar = ({ open, setClose }) => {
  const navbarItems = useSelector((state) => state.public.navbar.items);

  return (
    <Drawer className="drawer-dark" open={open} full onClose={setClose}>
      <Drawer.Body>
        <div className="w-full h-full flex justify-center items-center ">
          <ul>
            {navbarItems.map((navItem, iNavItem) => (
              <li key={iNavItem}>
                <Link to={navItem.path} onClick={() => setClose(true)}>
                  <h1 className="font-light poppins text-3xl my-6">{navItem.label}</h1>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Drawer.Body>
    </Drawer>
  );
};

const NavbarItem = ({ to, children }) => {
  return (
    <li className="float-left">
      <Link to={to} className="mx-4 px-4 py-2 moving-underline">
        {children}
      </Link>
    </li>
  );
};

const Navbar = () => {
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const navbarItems = useSelector((state) => state.public.navbar.items);

  return (
    <div
      className="w-full h-16 fixed md:px-12 px-6 flex items-center justify-between"
      style={{ backgroundColor: "#181818", zIndex: 1000 }}
    >
      <Link to="/" style={{ fontFamily: "Poppins" }} className="text-xl font-bold">
        JYPn
      </Link>

      <div>
        <div className="md:hidden">
          <button onClick={() => setMobileSidebarOpen(true)}>
            <HiMenuAlt1 className="text-xl" />
          </button>

          <MobileSidebar open={isMobileSidebarOpen} setClose={() => setMobileSidebarOpen(false)} />
        </div>
        <div className="text-sm hidden md:inline">
          <ul>
            {navbarItems.map((navItem, iNavItem) => (
              <NavbarItem key={iNavItem} to={navItem.path}>
                {navItem.label}
              </NavbarItem>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
