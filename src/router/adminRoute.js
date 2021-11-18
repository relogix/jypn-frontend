import { Route, Switch } from "react-router";
import AuthController from "../controllers/AuthController";
import Dashboard from "../pages/admin/Dashboard";
import Login from "../pages/admin/Login";
import Updates from "../pages/admin/Updates";
import AdminTemplateWrapper from "../pages/template/admin";

export const adminBasePath = "/admin";
export const adminRouteSlug = {
  DASHBOARD: `${adminBasePath}`,
  LOGIN: `${adminBasePath}/login`,

  UPDATES: `${adminBasePath}/updates`,
  UPDATE_CREATE: `${adminBasePath}/updates/create`,
  UPDATE_DETAIL: `${adminBasePath}/updates/detail`,
  UPDATE_UPDATE: `${adminBasePath}/updates/update`,
};

const AdminRoute = () => {
  return (
    <AuthController>
      <AdminTemplateWrapper>
        <Switch>
          <Route exact path={adminRouteSlug.DASHBOARD}>
            <Dashboard />
          </Route>
          <Route exact path={adminRouteSlug.LOGIN}>
            <Login />
          </Route>
          <Route path={adminRouteSlug.UPDATES}>
            <Updates />
          </Route>
        </Switch>
      </AdminTemplateWrapper>
    </AuthController>
  );
};

export default AdminRoute;
