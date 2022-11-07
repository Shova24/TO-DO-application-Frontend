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
  const userLogin = async (values) => {
    try {
      const response = await AuthAPI.post("/users/login", values);
      console.log("====================================");
      console.log(response?.data?.message);
      if (response?.data?.message === "User not found") {
        Notification("User not found");
        return;
      }
      if (response?.data?.message === "Password not matched!!!") {
        Notification("Password not matched!!!");
        return;
      }
      const token = response.data.token;
      console.log(response?.data?.token);
      localStorage.setItem("token", token);
      Notification("Logged In!!!");
      navigate("/");
      return;
    } catch (error) {
      console.log(error.response);
      Notification(error.response);
    }
  };

  return <userContext.Provider value={{ createNewUser, userLogin }}>{children}</userContext.Provider>;
};

export { userContext, ContextProvider };
