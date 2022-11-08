import { createContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

import { BaseAPI } from "./Api";
import { Notification } from "../Components/Notification";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [deletedTask, setDeletedTask] = useState([]);
  const [initialTask, setInitialTask] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const addItem = async (values) => {
    try {
      setShowLoader(true);
      const postTask = {
        id: uuidv4(),
        taskName: values?.taskName,
        priority: values?.priority,
        deadlineDate: moment(values?.deadlineDate).format("YYYY-MM-DD"),
        deadlineTime: moment(values?.deadlineDate).format("HH:mm:ss"),
        is_deleted: false,
      };

      await BaseAPI.post("/task/post-task", postTask);
      setInitialTask([...initialTask, postTask]);
      Notification("Task Added");
      setShowLoader(false);
    } catch (error) {
      console.log(error.message);
    }
  };
  const getTasks = async () => {
    try {
      setShowLoader(true);
      const response = await BaseAPI.get("/task/get-tasks");
      const data = response.data.message;
      const items = data.filter((el) => el.is_deleted === false);
      setInitialTask(items);
      const deletedItems = data.filter((el) => el.is_deleted === true);
      setDeletedTask(deletedItems);
      setShowLoader(false);
    } catch (error) {
      console.log("Something went wrong : ", error.message);
    }
  };

  const deleteTask = async (taskID) => {
    try {
      setShowLoader(true);
      const deletedItem = initialTask.find((el) => el.id === taskID);
      await BaseAPI.patch(`task/update-in-trash/${taskID}`);
      setDeletedTask([...deletedTask, deletedItem]);
      const initialItems = initialTask.filter((el) => el.id !== deletedItem.id);
      setInitialTask(initialItems);
      Notification("Task Deleted");
      setShowLoader(false);
      return;
    } catch (error) {
      console.log("Error : ", error.message);
    }
  };

  const updateApi = async (updatedTask, item) => {
    // setShowLoader(true);
    // const response = await fetch(``, {
    //   method: "PATCH",
    //   body: JSON.stringify(updatedTask),
    //   headers: {
    //     "Content-type": "application/json",
    //   },
    // });
    // console.log(response.status);
    // if (response.status === 200) {
    //   const data = await response.json();
    //   setInitialTask(data);
    //   // setShowLoader(false);
    //   return;
    // } else {
    //   // setShowLoader(false);
    //   return await Promise.reject(response);
    // }
  };

  const redo = async (taskID) => {
    try {
      setShowLoader(true);
      const redoItem = await deletedTask.find((el) => el.id === taskID);
      await BaseAPI.patch(`task/redo-task/${taskID}`);
      setInitialTask([...initialTask, redoItem]);
      const deletedItems = deletedTask.filter((el) => el.id !== redoItem.id);
      setDeletedTask(deletedItems);
      Notification("Task Restored");
      setShowLoader(false);
      return;
    } catch {
      console.log("Something not quite right");
    }
  };

  const removeTrash = async (id) => {
    try {
      setShowLoader(true);
      await BaseAPI.delete(`task/delete-task/${id}`);
      const filteredItem = deletedTask.filter((el) => el.id !== id);
      setDeletedTask(filteredItem);
      Notification("This task has been permanently deleted!");
      setShowLoader(false);
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
