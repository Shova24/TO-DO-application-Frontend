import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Col, Row, Divider, Tag, Card, Form, Input, Button, Radio, TimePicker, DatePicker, Modal, notification, Popconfirm, Spin } from "antd";
import { CloseOutlined, EditOutlined, RedoOutlined } from "@ant-design/icons";

import moment from "moment";

import Context from "../../Utils/TaskContext";
import { Notification } from "../../Components/Notification";
const { Title, Text } = Typography;
const { TextArea } = Input;
const rating = ["High", "Medium", "Low"];

export default function TaskItem({ item }) {
  const { deleteTask, initialTask, setInitialTask, redo, removeTrash, updateApi } = useContext(Context);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const redoItem = (id) => {
    redo(id);
    navigate("/");
  };

  const editTask = (task) => {
    const deadline = `${task.deadlineDate} ${task.deadlineTime}`;
    form.setFieldsValue({
      taskName: task?.taskName,
      priority: task?.priority,
      deadline: moment(deadline),
    });
    setIsModalVisible(true);
  };

  const onFinish = (values) => {
    const id = item.id;
    const updatedTask = {
      id: id,
      taskName: values.taskName,
      priority: values.priority,
      deadlineDate: moment(values.deadline).format("YYYY-MM-DD"),
      deadlineTime: moment(values.deadline).format("HH:mm:ss"),
    };

    updateApi(updatedTask, item.id);

    form.resetFields();
    Notification("Task Updated");
    setIsModalVisible(false);
  };

  return (
    <>
      <Card style={{ borderRadius: "20px" }}>
        <Row justify="end" gutter={[8, 4]}>
          <Col>
            <Tag color={`${item.priority === "High" ? "magenta" : item.priority === "Medium" ? "orange" : "blue"}`}>{item.priority} </Tag>
          </Col>
          {item.is_deleted ? (
            <>
              <Col>
                <Popconfirm title="Do you want to restore this task ?" onConfirm={() => redoItem(item.id)} okText="Yes" cancelText="No">
                  <RedoOutlined />
                </Popconfirm>
              </Col>
              <Col>
                <Popconfirm title="Do you want to delete this task Permanently ?" onConfirm={() => removeTrash(item.id)} okText="Yes" cancelText="No">
                  <CloseOutlined twoToneColor="#eb2f96" />
                </Popconfirm>
              </Col>
            </>
          ) : (
            <>
              <Col>
                <EditOutlined onClick={() => editTask(item)} />
              </Col>
              <Col>
                <Popconfirm title="Do you want to delete this task ?" onConfirm={() => deleteTask(item.id)} okText="Yes" cancelText="No">
                  <CloseOutlined />
                </Popconfirm>
              </Col>
            </>
          )}
        </Row>
        <Row>
          <Col span={24}>
            <div style={{ height: "200px", overflowY: `${item.taskName?.length > 80 ? "scroll" : "hidden"}`, marginTop: "1rem", paddingTop: "1rem", display: "flex", alignItems: "center" }}>
              <Title level={4}>{item.taskName}</Title>
            </div>
          </Col>
        </Row>

        <Divider orientation="center">Deadline</Divider>
        <Row gutter={[8, 8]}>
          <Row>
            <Col xs={24}>
              <Text>📅 {moment(item.deadlineDate).format("YYYY-MM-DD")} </Text>
            </Col>
            <Col span={24}>
              <Text>⌚ {item.deadlineTime}</Text>
            </Col>
          </Row>
        </Row>
      </Card>
      <Modal title="Edit Task" open={isModalVisible} closable={false} footer={null}>
        <Card style={{ borderRadius: "20px" }}>
          <Form form={form} layout="horizontal" onFinish={onFinish}>
            <Row gutter={[8, 8]}>
              <Col xs={24}>
                <Form.Item name="taskName" label="Task" labelCol={{ span: 24 }}>
                  <TextArea />
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="priority" label="Priority">
                  <Radio.Group>
                    {rating.map((el) => (
                      <Radio key={el} value={el}>
                        {el}
                      </Radio>
                    ))}
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col xs={24}>
                <Form.Item name="deadline" defaultValue={moment(item?.deadlineDate).format("YYYY-MM-DD HH:mm:ss")} label="Deadline Date">
                  <DatePicker showTime style={{ width: "100%" }} />
                </Form.Item>
              </Col>
            </Row>
            <Row justify="end">
              <Col>
                <Button shape="round" htmlType="submit">
                  Add Item
                </Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    </>
  );
}
