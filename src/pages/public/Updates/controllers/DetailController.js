import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router";

export const DetailContext = createContext();
const { Provider } = DetailContext;

const DetailController = ({ children }) => {
  const { updateCode } = useParams();

  // Get Update
  const [update, setUpdate] = useState([]);
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  useEffect(() => {
    let mounted = true;

    setLoadingUpdate(true);

    axios
      .get(`/update/find/update-code/${updateCode}`)
      .then((res) => {
        if (mounted) {
          let newUpdate = res.data?.update;
          setUpdate({
            ...newUpdate,
            createdAt: moment(new Date(newUpdate.createdAt)).format("YYYY-MM-DD HH:mm"),
          });
        }
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => {
        if (mounted) {
          setLoadingUpdate(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, []);

  return <Provider value={{ update, loadingUpdate }}>{children}</Provider>;
};

export default DetailController;
