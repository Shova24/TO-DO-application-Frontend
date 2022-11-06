import React, { useContext, useEffect } from "react";
import { Card, Col, Row, Spin } from "antd";

import TaskContext from "../../Utils/TaskContext";

import TaskItem from "./TaskItem";

export default function TaskList() {
  const { initialTask, showLoader, getTasks } = useContext(TaskContext);

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <>
      {showLoader ? (
        <Spin size="large" spinning={showLoader} style={{ textAlign: "center", marginLeft: "50%", marginTop: "10%" }} />
      ) : initialTask.length > 0 ? (
        <Card style={{ border: "none" }}>
          <Row gutter={[8, 8]}>
            {initialTask?.map((el) => (
              <Col xs={24} sm={12} md={8} key={el?.id}>
                <TaskItem item={el} />
              </Col>
            ))}
          </Row>
        </Card>
      ) : (
        <Card style={{ border: "none" }}>No Task is Assign yet!</Card>
      )}
    </>
  );
}
