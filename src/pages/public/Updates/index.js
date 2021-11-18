import { Route, Switch } from "react-router";
import { publicRouteSlug } from "../../../router/publicRoute";
import Detail from "./components/Detail";
import GridData from "./components/GridData";
import GridController from "./controllers/GridController";

const Updates = () => {
  return (
    <div className="w-full pt-16">
      <div className="p-6 md:p-12 md:py-10">
        <GridController>
          <Switch>
            <Route path={`${publicRouteSlug.UPDATES_DETAIL}/:updateCode`}>
              <Detail />
            </Route>
            <Route>
              <GridData />
            </Route>
          </Switch>
        </GridController>
      </div>
    </div>
  );
};

export default Updates;
