import React, { useContext } from "react";
import { Input, Button, Radio, TimePicker, DatePicker, Form, Row, Col, notification, Card } from "antd";
import TaskContext from "../../Utils/TaskContext";

const { TextArea } = Input;
const rating = ["High", "Medium", "Low"];

export default function AddTask() {
  const { addItemApi } = useContext(TaskContext);
  const [form] = Form.useForm();
  const addItem = (values) => {};
  return (
    <Card style={{ border: "none" }}>
      <Form form={form} layout="horizontal" onFinish={addItem}>
        <Row gutter={[8, 8]}>
          <Col xs={24}>
            <Form.Item name="taskName" label="Task" labelCol={{ span: 24 }}>
              <TextArea />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
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
          <Col xs={24} md={8}>
            <Form.Item name="deadlineDate" label="Deadline Date">
              <DatePicker style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          <Col xs={24} md={8}>
            <Form.Item name="deadlineRange" label="Time">
              <TimePicker.RangePicker />
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
  );
}
