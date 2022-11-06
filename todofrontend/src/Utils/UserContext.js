import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const userContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const createNewUser = async (values) => {};
  const getUsers = async () => {};
  const userLogin = async (values) => {};
  const userLogout = async () => {};
  const deleteUser = async () => {};
  const updateUser = async () => {};
  return <userContext.Provider value={{ createNewUser, user, getUsers, userLogin, userLogout, deleteUser, updateUser }}>{children}</userContext.Provider>;
};

export { userContext, ContextProvider };
