import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useHistory } from "react-router";
import { Notification, toaster } from "rsuite";
import { AuthContext } from "../../../../controllers/AuthController";
import { adminRouteSlug } from "../../../../router/adminRoute";
import { Context } from "./Controller";

export const DeleteContext = createContext();
const { Provider } = DeleteContext;

const DeleteController = ({ children }) => {
  const history = useHistory();
  const { userData } = useContext(AuthContext);
  const { deleteUpdateId, handleModalDelete } = useContext(Context);

  // -------------------------------------
  // Handle Delete Update
  // -------------------------------------
  const [loadingDelete, setLoadingDelete] = useState(false);
  const handleDeleteUpdate = () => {
    setLoadingDelete(true);

    axios
      .delete(`/update/delete?updateId=${deleteUpdateId}`, { headers: { Authorization: `Bearer ${userData.token}` } })
      .then((res) => {
        toaster.push(<Notification type={"success"} header="Data successfully deleted" />, { placement: "topEnd" });
        history.push(adminRouteSlug.UPDATES);
        handleModalDelete(false);
      })
      .catch((err) => {
        toaster.push(<Notification type={"error"} header={`Delete Failed. ${err.response.data?.message}`} />, {
          placement: "topEnd",
        });
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  return <Provider value={{ loadingDelete, handleDeleteUpdate }}>{children}</Provider>;
};

export default DeleteController;
