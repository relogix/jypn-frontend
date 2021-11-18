import axios from "axios";
import { useState } from "react";
import { createContext } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Notification, toaster } from "rsuite";
import { adminRouteSlug } from "../../../../router/adminRoute";

export const CreateContext = createContext();
const { Provider } = CreateContext;

const CreateController = ({ children }) => {
  const form = useForm();
  const history = useHistory();

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const handleSubmit = () => {
    setLoadingSubmit(true);
    const values = form.getValues();

    const formData = new FormData();
    formData.append(
      "data",
      JSON.stringify({
        title: values?.title,
        content: values?.content,
      })
    );
    values?.thumbnail && formData.append("thumbnail", values?.thumbnail.blobFile);

    axios
      .post("/update/create", formData)
      .then((res) => {
        toaster.push(<Notification type={"success"} header="Data successfully created" />, { placement: "topEnd" });
        history.push(adminRouteSlug.UPDATES);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return <Provider value={{ form, handleSubmit, loadingSubmit }}>{children}</Provider>;
};

export default CreateController;
