import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

const SidebarItem = ({ path = "/", Icon, children }) => {
  const { pathname } = useLocation();
  const isActive = path === pathname;

  return (
    <li className="my-2">
      <Link to={path}>
        <div
          className={`${
            isActive && "bg-white bg-opacity-10"
          } hover:bg-white hover:bg-opacity-10 p-2 px-3 text-xs flex justify-between items-center rounded-md`}
        >
          <div className="flex items-end">
            <Icon className="text-lg mr-3" /> <span>{children}</span>
          </div>
        </div>
      </Link>
    </li>
  );
};

const Sidebar = ({}) => {
  const sidebarItems = useSelector((state) => state.admin.sidebar.items);

  return (
    <div className="w-full">
      <div className="w-full h-16 px-6 flex items-center" style={{ backgroundColor: "#181818" }}>
        <span className="font-light text-xs ml-2 tracking-widest">ADMINISTRATOR</span>
      </div>

      <ul className="my-4 px-4">
        {sidebarItems.map((item, iItem) => (
          <SidebarItem key={iItem} Icon={item.Icon} path={item.path}>
            {item.label}
          </SidebarItem>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
