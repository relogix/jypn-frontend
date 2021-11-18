import { createContext } from "react";
import AuthController from "./AuthController";

export const GlobalContext = createContext();
const { Provider } = GlobalContext;

const GlobalController = ({ children }) => {
  return <Provider value={{}}>{children}</Provider>;
};

export default GlobalController;
