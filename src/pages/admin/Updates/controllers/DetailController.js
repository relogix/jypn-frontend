import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useParams } from "react-router";

export const DetailContext = createContext();
const { Provider } = DetailContext;

const DetailController = ({ children }) => {
  const { updateCode } = useParams();

  // Get Update
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [update, setUpdate] = useState();
  useEffect(() => {
    let mounted = true;
    setLoadingUpdate(true);

    axios
      .get(`/update/find/update-code/${updateCode}`)
      .then((res) => {
        mounted && setUpdate(res.data?.update);
      })
      .catch((err) => console.error(err))
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
