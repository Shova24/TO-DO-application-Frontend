import { createContext, useEffect, useState } from "react";
import { notification } from "antd";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [deletedTask, setDeletedTask] = useState([]);
  const [initialTask, setInitialTask] = useState([]);
  const [showLoader, setShowLoader] = useState(false);

  const addItem = async (postItem) => {
    //adding post api
    try {
      setShowLoader(true);
      const response = await fetch("", {
        method: "POST",
        body: JSON.stringify(postItem),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.status === 201) {
        const data = await response.json();
        setInitialTask(data);
        setShowLoader(false);
        return;
      } else {
        return await Promise.reject(response);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (taskID) => {
    try {
      setShowLoader(true);
      const deletedItem = initialTask.find((el) => el.id === taskID);

      const response = await fetch(``, {
        method: "PATCH",
        body: JSON.stringify(deletedItem),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (response.status === 200) {
        const data = await response.json();
        setDeletedTask(data);

        const initialItems = initialTask.filter((el) => el.id !== data.id);
        setInitialTask(initialItems);
        notification.open({
          message: "Task Deleted",
        });
        setShowLoader(false);
        return;
      } else {
        return await Promise.reject(response);
      }
    } catch {
      console.log("Something not right");
    }
  };

  const getTasks = async () => {
    try {
      setShowLoader(true);
      const response = await fetch("");
      const data = await response.json();
      const items = data.filter((el) => el.is_deleted === false);
      setInitialTask(items);
      const deletedItems = data.filter((el) => el.is_deleted === true);
      setDeletedTask(deletedItems);
      setShowLoader(false);
    } catch {
      console.log("Something went wrong...");
    }
  };

  const updateApi = async (updatedTask, item) => {
    setShowLoader(true);
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
      setShowLoader(false);
      return;
    } else {
      setShowLoader(false);
      return await Promise.reject(response);
    }
  };

  const redo = async (taskID) => {
    try {
      setShowLoader(true);
      const redoItem = await deletedTask.find((el) => el.id === taskID);

      const response = await fetch(``, {
        method: "PATCH",
        body: JSON.stringify(redoItem),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        setInitialTask([...initialTask, data]);
        const deletedItems = deletedTask.filter((el) => el.id !== data.id);
        setDeletedTask(deletedItems);
        notification.open({
          message: "Task Restored",
        });
        setShowLoader(false);
        return;
      } else {
        return await Promise.reject(response);
      }
    } catch {
      console.log("Something not quite right");
    }
  };

  const removeTrash = async (id) => {
    try {
      setShowLoader(true);
      await fetch(``, {
        method: "DELETE",
      });
      const filteredItem = deletedTask.filter((el) => el.id !== id);
      setDeletedTask(filteredItem);

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
