import { Route, Switch } from "react-router";
import Controller from "./controllers/Controller";
import { publicRouteSlug } from "../../../router/publicRoute";
import GridData from "./components/GridData";
import Detail from "./components/Detail";
import { setPageTitle } from "../../../utils/html.util";

const Members = () => {
  setPageTitle("Members");
  return (
    <div className="w-full pt-16 md:h-screen">
      <Controller>
        <Switch>
          <Route path={`${publicRouteSlug.MEMBERS_DETAIL}/:member`}>
            <Detail />
          </Route>
          <Route>
            <GridData />
          </Route>
        </Switch>
      </Controller>
    </div>
  );
};

export default Members;
