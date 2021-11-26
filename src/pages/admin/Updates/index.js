import Controller from "./controllers/Controller";
import { Route, Switch } from "react-router";
import TableData from "./components/TableData";
import FormCreate from "./components/FormCreate";
import FormUpdate from "./components/FormUpdate";
import { adminRouteSlug } from "../../../router/adminRoute";
import Detail from "./components/Detail";
import ModalDelete from "./components/ModalDelete";
import { setPageTitleAdmin } from "../../../utils/html.util";

const Updates = () => {
  setPageTitleAdmin("Updates");
  return (
    <div className="w-full p-8">
      <Switch>
        <Route exact path={adminRouteSlug.UPDATE_CREATE}>
          <FormCreate />
        </Route>
        <Route path={`${adminRouteSlug.UPDATE_DETAIL}/:updateCode`}>
          <Detail />
        </Route>
        <Route path={`${adminRouteSlug.UPDATE_UPDATE}/:updateCode`}>
          <FormUpdate />
        </Route>
        <Route>
          <TableData />
        </Route>
      </Switch>

      <ModalDelete />
    </div>
  );
};

export default () => (
  <Controller>
    <Updates />
  </Controller>
);
