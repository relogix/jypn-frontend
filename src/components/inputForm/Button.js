import { useHistory } from "react-router";
import { Loader } from "rsuite";

const Button = ({
  className = "",
  to = null,
  onClick = () => "",
  loading = false,
  disabled = false,
  children,
  ...props
}) => {
  const history = useHistory();
  const handleRedirect = () => {
    history.push(to);
  };

  return (
    <button
      onClick={to ? handleRedirect : onClick}
      disabled={loading || disabled}
      style={{ backgroundColor: disabled && "gray" }}
      className={`text-xs p-4 py-2 bg-white bg-opacity-10 hover:bg-opacity-20 transition-all rounded-md ${className}`}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
