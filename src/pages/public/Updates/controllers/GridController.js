import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router";

export const GridContext = createContext();
const { Provider } = GridContext;

const GridController = ({ children }) => {
  //   window.onscroll = () => {
  //     console.log(window.innerHeight + document.documentElement.scrollTop > document.documentElement.offsetHeight - 10);
  //   };

  // Get Updates
  const [updates, setUpdates] = useState([]);
  const [reloadUpdates, setReloadUpdates] = useState(true);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  const [page, setPage] = useState(1);
  useEffect(() => {
    let mounted = true;

    const getUpdates = () => {
      setLoadingUpdates(true);

      axios
        .get(`/update/search?sortBy=createdAt&sortType=DESC&limit=6&page=${page}`)
        .then((res) => {
          if (mounted) {
            let newUpdates = res.data?.updates;
            newUpdates = newUpdates.map((update) => ({
              ...update,
              createdAt: moment(new Date(update.createdAt)).format("YYYY-MM-DD HH:mm"),
            }));

            setUpdates([...updates, ...newUpdates]);
            newUpdates.length != 0 && setPage(page + 1);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          if (mounted) {
            setTimeout(() => mounted && setReloadUpdates(false), page !== 1 ? 1000 : 0);
            setLoadingUpdates(false);
          }
        });
    };

    reloadUpdates && getUpdates();

    return () => {
      mounted = false;
    };
  }, [reloadUpdates]);

  return <Provider value={{ updates, loadingUpdates, setReloadUpdates }}>{children}</Provider>;
};

export default GridController;
