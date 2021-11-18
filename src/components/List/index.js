import { useHistory } from "react-router";

export const ListItem = ({ to = "", onClick = () => "", children }) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push(to);
  };

  return (
    <li>
      <button
        className="bg-white bg-opacity-10 hover:bg-opacity-20 transition-all w-full my-3 p-3 px-5 flex justify-between items-center rounded-md"
        onClick={to ? handleRedirect : onClick}
      >
        {children}
      </button>
    </li>
  );
};

export const List = ({ children }) => {
  return <ul>{children}</ul>;
};
