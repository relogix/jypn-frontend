import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";

export const TableContext = createContext();
const { Provider } = TableContext;

const TableController = ({ children }) => {
  // -----------------------------------------
  // Get Updates
  // -----------------------------------------
  const [updates, setUpdates] = useState([]);
  const [reloadUpdates, setReloadUpdates] = useState(true);
  const [loadingUpdates, setLoadingUpdates] = useState(false);
  const [updateParam, setUpdateParam] = useState({ sortBy: "createdAt", sortType: "DESC" });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [limit] = useState(10);
  useEffect(() => {
    let mounted = true;
    let source = axios.CancelToken.source();

    const getUpdates = () => {
      setLoadingUpdates(true);
      const param = Object.keys(updateParam)
        .filter((key) => updateParam[key] !== undefined)
        .map((key) => `${key}=${updateParam[key]}`)
        .join("&");

      axios
        .get(`/update/search?${param}`)
        .then((res) => {
          if (mounted) {
            let newUpdates = res.data?.updates;
            newUpdates = newUpdates.map((update) => ({
              ...update,
              createdAt: moment(new Date(update.createdAt)).format("YYYY-MM-DD HH:mm"),
            }));

            setUpdates(newUpdates);
            setCurrentPage(res.data?.page);
            setTotalPage(res.data?.totalPage);
            setTotalData(res.data?.totalData);
          }
        })
        .catch((err) => {
          setCurrentPage(1);
          setTotalPage(1);
          console.error(err);
        })
        .finally(() => {
          if (mounted) {
            setReloadUpdates(false);
            setLoadingUpdates(false);
          }
        });
    };

    reloadUpdates && getUpdates();

    return () => {
      mounted = false;
      source.cancel("Cancelling in Cleanup");
    };
  }, [reloadUpdates]);

  // -----------------------------------------
  // Param Handler
  // -----------------------------------------
  const handleFilter = (value) => {
    setUpdateParam({ ...updateParam, filter: value || undefined });
    setReloadUpdates(true);
  };
  const handleSort = (sortBy, sortType) => {
    setUpdateParam({ ...updateParam, sortBy, sortType });
    setReloadUpdates(true);
  };
  const handlePage = (page) => {
    setUpdateParam({ ...updateParam, page });
    setReloadUpdates(true);
  };
  const handleLimit = (limit) => {
    setUpdateParam({ ...updateParam, limit });
    setReloadUpdates(true);
  };

  return (
    <Provider
      value={{
        updates,
        loadingUpdates,
        setReloadUpdates,
        currentPage,
        totalPage,
        totalData,
        limit,
        handleFilter,
        handleSort,
        handlePage,
        handleLimit,
      }}
    >
      {children}
    </Provider>
  );
};

export default TableController;
