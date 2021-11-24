import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const { Provider } = Context;

const Controller = ({ children }) => {
  // Members
  const [members, setMembers] = useState([]);
  const [loadingMembers, setLoadingMembers] = useState(false);
  useEffect(() => {
    let mounted = true;
    let source = axios.CancelToken.source();

    const getMembers = () => {
      setLoadingMembers(true);

      axios
        .get(`/member`)
        .then((res) => {
          let newMembers = res.data?.members;

          if (mounted) {
            setMembers(newMembers);
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          if (mounted) {
            setLoadingMembers(false);
          }
        });
    };

    getMembers();

    return () => {
      mounted = false;
      source.cancel("Cancelling in Cleanup");
    };
  }, []);

  return <Provider value={{ members, loadingMembers }}>{children}</Provider>;
};

export default Controller;
