import axios from "axios";
import moment from "moment";
import { createContext, useEffect, useState } from "react";

export const Context = createContext();
const { Provider } = Context;

const Controller = ({ children }) => {
  // Handle Modal Delete
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [deleteUpdateId, setDeleteUpdateId] = useState();
  const handleModalDelete = (isOpen, updateId = "") => {
    setModalDeleteOpen(isOpen);
    setDeleteUpdateId(updateId || null);
  };

  return <Provider value={{ modalDeleteOpen, deleteUpdateId, handleModalDelete }}>{children}</Provider>;
};

export default Controller;
