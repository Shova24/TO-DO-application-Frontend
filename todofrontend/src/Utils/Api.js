import axios from "axios";

export const AuthAPI = axios.create({
  baseURL: process.env.REACT_APP_BaseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const BaseAPI = axios.create({
  baseURL: process.env.REACT_APP_BaseUrl,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("token"),
  },
});
