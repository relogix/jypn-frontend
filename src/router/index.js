import { Route, Switch } from "react-router";
import AdminRoute, { adminBasePath } from "./adminRoute";
import PublicRoute from "./publicRoute";

const Router = () => {
  return (
    <Switch>
      <Route path={adminBasePath}>
        <AdminRoute />
      </Route>
      <Route>
        <PublicRoute />
      </Route>
    </Switch>
  );
};

export default Router;
