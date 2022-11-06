import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./ProtecctedRoutes/LoggedInRoutes";
import Login from "../Pages/AuthPages/Login";
import { Button } from "antd";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          element={
            <>
              <Button>Homepage</Button>
            </>
          }
          exact
          path="/"
        />
      </Route>
      <Route element={<Login />} path="/login" />
    </Routes>
  );
}
