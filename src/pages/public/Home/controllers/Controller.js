import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const { Provider } = Context;

const Controller = ({ children }) => {
  // Latest Update
  const [updates, setUpdates] = useState([]);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  useEffect(() => {
    let mounted = true;
    let source = axios.CancelToken.source();

    const getUpdates = () => {
      setLoadingUpdates(true);

      axios
        .get(`/update/search?sortBy=createdAt&sortType=DESC&limit=5`)
        .then((res) => {
          let newUpdates = res.data?.updates;
          newUpdates = newUpdates.map((update) => ({
            ...update,
            createdAt: moment(new Date(update.createdAt)).format("YYYY-MM-DD HH:mm"),
          }));

          if (mounted) {
            setUpdates(newUpdates);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          if (mounted) {
            setLoadingUpdates(false);
          }
        });
    };

    getUpdates();

    return () => {
      mounted = false;
      source.cancel("Cancelling in Cleanup");
    };
  }, []);

  return <Provider value={{ updates, loadingUpdates }}>{children}</Provider>;
};

export default Controller;
