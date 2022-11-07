import { createContext, useEffect, useState } from "react";
import { notification } from "antd";
import { BaseAPI } from "./Api";

import moment from "moment";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [deletedTask, setDeletedTask] = useState([]);
  const [initialTask, setInitialTask] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const addItem = async (values) => {
    try {
      const dateTime = moment(values?.deadlineDate).format("YYYY-MM-DD HH:mm:ss");
      const date = dateTime.split(" ")[0];
      const time = dateTime.split(" ")[1];
      const postTask = {
        taskName: values?.taskName,
        priority: values?.priority,
        deadlineDate: date,
        deadlineTime: time,
        is_deleted: false,
      };
      const response = await BaseAPI.post("/task/post-task", postTask);
      console.log(response);
      setInitialTask([...initialTask, postTask]);

      console.log(postTask);
      console.log("====================================");
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTasks = async () => {
    try {
      // setShowLoader(true);
      const response = await BaseAPI.get("/task/get-tasks");
      console.log("Response Task : ", response.data.message);
      const data = response.data.message;
      const items = data.filter((el) => el.is_deleted === false);
      setInitialTask(items);
      const deletedItems = data.filter((el) => el.is_deleted === true);
      setDeletedTask(deletedItems);
      // setShowLoader(false);
    } catch (error) {
      console.log("Something went wrong : ", error.message);
    }
  };

  const deleteTask = async (taskID) => {
    try {
      // setShowLoader(true);
      const deletedItem = initialTask.find((el) => el.id === taskID);
      await BaseAPI.patch(`task/update-in-trash/${taskID}`);
      setDeletedTask([...deletedTask, deletedItem]);
      const initialItems = initialTask.filter((el) => el.id !== deletedItem.id);
      setInitialTask(initialItems);
      notification.open({
        message: "Task Deleted",
      });
      // setShowLoader(false);
      return;
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  const updateApi = async (updatedTask, item) => {
    // setShowLoader(true);
    const response = await fetch(``, {
      method: "PATCH",
      body: JSON.stringify(updatedTask),
      headers: {
        "Content-type": "application/json",
      },
    });
    console.log(response.status);
    if (response.status === 200) {
      const data = await response.json();
      setInitialTask(data);
      // setShowLoader(false);
      return;
    } else {
      // setShowLoader(false);
      return await Promise.reject(response);
    }
  };

  const redo = async (taskID) => {
    try {
      // setShowLoader(true);
      const redoItem = await deletedTask.find((el) => el.id === taskID);
      await BaseAPI.patch(`task/redo-task/${taskID}`);
      setInitialTask([...initialTask, redoItem]);
      const deletedItems = deletedTask.filter((el) => el.id !== redoItem.id);
      setDeletedTask(deletedItems);
      notification.open({
        message: "Task Restored",
      });
      // setShowLoader(false);
      return;
    } catch {
      console.log("Something not quite right");
    }
  };

  const removeTrash = async (id) => {
    try {
      // setShowLoader(true);
      await BaseAPI.delete(`task/delete-task/${id}`);
      const filteredItem = deletedTask.filter((el) => el.id !== id);
      setDeletedTask(filteredItem);

      // setShowLoader(false);
    } catch {
      console.log("Something not quite right");
    }
  };

  return (
    <TaskContext.Provider
      value={{
        deletedTask,
        showLoader,
        initialTask,
        setInitialTask,
        setDeletedTask,
        deleteTask,
        getTasks,
        redo,
        removeTrash,
        updateApi,
        addItem,
      }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskContext;
