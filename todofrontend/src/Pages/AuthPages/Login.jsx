import React, { useContext } from "react";
import { Button, Card, Divider, Form, Input, Row } from "antd";
import { Link } from "react-router-dom";
import { userContext } from "../../Utils/UserContext";

export default function Login() {
  const [form] = Form.useForm();
  const { userLogout } = useContext(userContext);
  return (
    <Card style={{ margin: "25px", border: "none" }}>
      <Divider>Login</Divider>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 20,
        }}
        labelAlign="left"
        initialValues={{
          remember: true,
        }}
        labelWrap="true"
        onFinish={userLogout}>
        {/* onFinish={login}> */}
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your Email!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}>
          <Input.Password />
        </Form.Item>
        <Row justify="end">
          <Button htmlType="submit">Login</Button>
        </Row>
      </Form>
      <Row justify="center">
        <Link to={"/register"}> Register</Link>
      </Row>
    </Card>
  );
}
