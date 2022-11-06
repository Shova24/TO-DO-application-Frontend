import React from "react";
import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./ProtecctedRoutes/LoggedInRoutes";
import Login from "../Pages/AuthPages/Login";
import Register from "../Pages/AuthPages/Register";
import UserProfile from "../Pages/AuthPages/UserProfile";
import AddTask from "../Pages/TasksPages/AddTask";
import TaskList from "../Pages/TasksPages/TaskList";
import DeletedTaskList from "../Pages/TasksPages/DeletedTaskList";
import BaseLayout from "../Layoutes/BaseLayout";
import AuthLayOut from "../Layoutes/AuthLayout";

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoutes />}>
        <Route
          element={
            <BaseLayout>
              <AddTask />
              <TaskList />
            </BaseLayout>
          }
          exact
          path="/"
        />
        <Route element={<UserProfile />} path="/user-profile" />
        <Route
          element={
            <BaseLayout>
              <DeletedTaskList />
            </BaseLayout>
          }
          path="/deleted-tasks"
        />
      </Route>
      <Route
        element={
          <AuthLayOut>
            <Login />
          </AuthLayOut>
        }
        path="/login"
      />
      <Route
        element={
          <AuthLayOut>
            <Register />
          </AuthLayOut>
        }
        path="/register"
      />
    </Routes>
  );
}
