import { useHistory } from "react-router";
import { Loader } from "rsuite";

const Button = ({ className = "", to = null, onClick = () => "", loading = false, children }) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push(to);
  };

  return (
    <button
      onClick={to ? handleRedirect : onClick}
      disabled={loading}
      className={`text-xs p-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all rounded-md ${className}`}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
