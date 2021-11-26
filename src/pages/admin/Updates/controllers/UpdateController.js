import axios from "axios";
import { useContext } from "react";
import { useEffect, useState } from "react";
import { createContext } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router";
import { Notification, toaster } from "rsuite";
import { AuthContext } from "../../../../controllers/AuthController";

export const UpdateContext = createContext();
const { Provider } = UpdateContext;

const UpdateController = ({ children }) => {
  const form = useForm();
  const { userData } = useContext(AuthContext);
  const { updateCode } = useParams();

  // -------------------------------------
  // Get Data
  // -------------------------------------
  const [reloadUpdate, setReloadUpdate] = useState(true);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [update, setUpdate] = useState();
  useEffect(() => {
    let mounted = true;
    setLoadingUpdate(true);

    const getUpdate = () => {
      axios
        .get(`/update/find/update-code/${updateCode}`)
        .then((res) => {
          if (mounted) {
            const newUpdate = res.data?.update;
            console.log(newUpdate);

            setUpdate(newUpdate);
            form.reset({
              ...newUpdate,
            });
          }
        })
        .catch((err) => console.error(err))
        .finally(() => {
          if (mounted) {
            setLoadingUpdate(false);
            setReloadUpdate(false);
          }
        });
    };

    reloadUpdate && getUpdate();

    return () => {
      mounted = false;
    };
  }, [reloadUpdate]);

  // -------------------------------------
  // Handle Update Data
  // -------------------------------------

  const [loadingSubmitUpdateData, setLoadingSubmitUpdateData] = useState(false);
  const handleSubmitUpdateData = () => {
    setLoadingSubmitUpdateData(true);
    const values = form.getValues();

    axios
      .patch(
        `/update/update-data?updateId=${update?.updateId}`,
        {
          title: values?.title,
          content: values?.content,
        },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      )
      .then((res) => {
        toaster.push(<Notification type={"success"} header="Data successfully updated" />, { placement: "topEnd" });
      })
      .catch((err) => {
        toaster.push(<Notification type={"error"} header={`Update Failed. ${err.response.data?.message}`} />, {
          placement: "topEnd",
        });
      })
      .finally(() => {
        setLoadingSubmitUpdateData(false);
        setReloadUpdate(true);
      });
  };

  // -------------------------------------
  // Handle Remove Thumbnail
  // -------------------------------------
  const [loadingRemoveThumbnail, setLoadingRemoveThumbnail] = useState(false);
  const handleRemoveThumbnail = () => {
    setLoadingRemoveThumbnail(true);
    const formData = new FormData();

    axios
      .patch(`/update/change-cover?updateId=${update?.updateId}`, formData)
      .then((res) => {
        toaster.push(<Notification type={"success"} header="Thumbnail successfully updated" />, {
          placement: "topEnd",
        });
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingRemoveThumbnail(false);
        setReloadUpdate(true);
      });
  };

  // -------------------------------------
  // Handle Change Thumbnail
  // -------------------------------------
  const [loadingChangeThumbnail, setLoadingChangeThumbnail] = useState(false);
  const handleChangeThumbnail = () => {
    const thumbnail = form.getValues("thumbnail");
    if (!thumbnail) return;

    setLoadingChangeThumbnail(true);

    const formData = new FormData();
    formData.append("thumbnail", thumbnail?.blobFile);

    axios
      .patch(`/update/change-cover?updateId=${update?.updateId}`, formData)
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingChangeThumbnail(false);
        setReloadUpdate(true);
      });
  };

  return (
    <Provider
      value={{
        form,
        loadingUpdate,
        update,
        loadingSubmitUpdateData,
        handleSubmitUpdateData,
        loadingRemoveThumbnail,
        handleRemoveThumbnail,
        loadingChangeThumbnail,
        handleChangeThumbnail,
      }}
    >
      {children}
    </Provider>
  );
};

export default UpdateController;
