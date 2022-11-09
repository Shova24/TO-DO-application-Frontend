import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  let auth = true;
  // if (token === "null") {
  //   auth = false;
  // }
  // const parseJwt = JSON.parse(atob(token.split(".")[1]));
  // if (parseJwt.exp * 1000 < Date.now()) {
  //   return <Navigate to="/login" />;
  // }
  // console.log(token);

  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
