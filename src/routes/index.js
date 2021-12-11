import { BrowserRouter } from "react-router-dom";
import PublicRoutes from "./publicRoutes";

const MainRoutes = () => {
  return (
    <BrowserRouter>
      <PublicRoutes />
    </BrowserRouter>
  );
};

export default MainRoutes;
