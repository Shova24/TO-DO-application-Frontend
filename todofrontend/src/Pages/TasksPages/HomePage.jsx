import React from "react";
import AddRole from "./AddRole";
import AddTask from "./AddTask";
import TaskList from "./TaskList";

export default function HomePage() {
  const admin = true;
  return (
    <>
      {admin ? <AddRole /> : <AddTask />}
      <TaskList />
    </>
  );
}
