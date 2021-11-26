import { Route, Switch } from "react-router";
import { publicRouteSlug } from "../../../router/publicRoute";
import Detail from "./components/Detail";
import GridData from "./components/GridData";
import { AnimatePresence } from "framer-motion";
import GridController from "./controllers/GridController";
import { setPageTitle } from "../../../utils/html.util";
import PageViewsTracking from "../../../components/Analytics/PageViewsTracking";

const Updates = () => {
  setPageTitle("Updates");
  return (
    <div className="w-full pt-16">
      <div className="p-6 md:p-12 md:py-10">
        <GridController>
          <AnimatePresence>
            <Switch>
              <Route path={`${publicRouteSlug.UPDATES_DETAIL}/:updateCode`}>
                <Detail />
              </Route>
              <Route>
                <GridData />
              </Route>
            </Switch>
          </AnimatePresence>
        </GridController>
      </div>

      <PageViewsTracking />
    </div>
  );
};

export default Updates;
