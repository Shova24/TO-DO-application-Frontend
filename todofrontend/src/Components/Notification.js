import { notification } from "antd";

export const Notification = (text) => {
  notification.open({
    message: text,
  });
};
