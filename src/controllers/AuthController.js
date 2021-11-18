import axios from "axios";
import Cookies from "js-cookie";
import { createContext, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { adminRouteSlug } from "../router/adminRoute";

export const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthController = ({ children }) => {
  const history = useHistory();

  // -------------------------------------------
  // User Data
  // -------------------------------------------
  const [userData, setUserData] = useState();
  useEffect(() => {
    const token = Cookies.get("ud");
    if (token) {
      axios
        .post("/administrator/verify-token", {
          token,
        })
        .then((res) => {
          setUserData(res.data);
        })
        .catch((err) => {
          setUserData(null);
          Cookies.remove("ud");
          history.push(adminRouteSlug.LOGIN);
          console.error(err);
        });
    } else {
      history.push(adminRouteSlug.LOGIN);
    }
  }, []);

  // -------------------------------------------
  // Login
  // -------------------------------------------

  const [isLoginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState();
  const handleLogin = ({ username, password, rememberMe }) => {
    setLoginLoading(true);

    axios
      .post("/administrator/login", {
        username,
        password,
        rememberMe,
      })
      .then((res) => {
        const { token, ...newUserData } = res.data;
        Cookies.set("ud", token, { expires: 1000 });
        setUserData(newUserData);

        setLoginError(null);
      })
      .catch((err) => {
        const statusCode = err.response?.status;
        setLoginError(
          statusCode === 400 ? "Incorrect username and password" : "Internal Server Error. Please try again later"
        );
        console.error(err);
      })
      .finally(() => {
        setLoginLoading(false);
      });
  };

  // -------------------------------------------
  // Logout
  // -------------------------------------------
  const handleLogout = () => {
    Cookies.remove("ud");
    setUserData(null);
    history.push(adminRouteSlug.LOGIN);
  };

  return <Provider value={{ userData, handleLogin, isLoginLoading, loginError, handleLogout }}>{children}</Provider>;
};

export default AuthController;
