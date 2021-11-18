import { Route, Switch } from "react-router";
import Home from "../pages/public/Home";
import Updates from "../pages/public/Updates";
import PublicTemplateWrapper from "../pages/template/public";

export const publicRouteSlug = {
  HOME: "/",
  UPDATES: "/updates",
  UPDATES_DETAIL: "/updates/detail",
};

const PublicRoute = () => {
  return (
    <PublicTemplateWrapper>
      <Switch>
        <Route exact path={publicRouteSlug.HOME}>
          <Home />
        </Route>
        <Route path={`${publicRouteSlug.UPDATES}`}>
          <Updates />
        </Route>
      </Switch>
    </PublicTemplateWrapper>
  );
};

export default PublicRoute;
