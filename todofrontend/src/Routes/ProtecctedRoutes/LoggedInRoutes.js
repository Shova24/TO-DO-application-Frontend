import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const token = localStorage.getItem("token");

  let auth = true;
  if (token === "null") {
    auth = false;
  }

  // console.log(token);
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
