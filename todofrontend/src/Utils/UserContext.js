import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Notification } from "../Components/Notification";
import { AuthAPI } from "./Api";

const userContext = createContext();

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState([]);
  const navigate = useNavigate();

  const createNewUser = async (values) => {
    try {
      const response = await AuthAPI.post("/users/register", values);
      Notification(response.data.message);
      console.log("Response : ", response);
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      Notification(error.response.data.message);
    }
  };
  const getUsers = async () => {};
  const userLogin = async (values) => {};
  const userLogout = async () => {};
  const deleteUser = async () => {};
  const updateUser = async () => {};
  return <userContext.Provider value={{ createNewUser, user, getUsers, userLogin, userLogout, deleteUser, updateUser }}>{children}</userContext.Provider>;
};

export { userContext, ContextProvider };
