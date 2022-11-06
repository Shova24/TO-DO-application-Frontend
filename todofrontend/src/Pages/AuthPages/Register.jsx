import { Button, Card, Checkbox, Divider, Form, Input, Row } from "antd";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../Utils/UserContext";

export default function Register() {
  const [form] = Form.useForm();
  const { createNewUser } = useContext(userContext);
  return (
    <Card style={{ margin: "50px", border: "none" }}>
      <Divider>Register</Divider>
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
        onFinish={createNewUser}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
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
            {
              pattern: /[A-Z]/,
              message: `Password A-Z`,
            },
            {
              pattern: /[a-z]/,
              message: `a-z`,
            },
            {
              pattern: /(?=.*\d)/,
              message: `number`,
            },
            {
              pattern: /[a-zA-Z0-9!*#$%&?]{4,}/,
              // pattern: /[A-Za-z\d]{8,}/,
              message: `Minimum length - 8`,
            },
            // {
            //   pattern: /^(?=.*[*.!@$%^&(){}[]:;<>,.?/~_+-=|\])$/,
            //   message: `Special charecter`,
            // },
            {
              pattern: /(?=.*[a-zA-Z >>!#$%&? "<<])[a-zA-Z0-9 >>!#$%&?<< ]/g,
              message: `Special charecter`,
            },
            // {
            //   pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/,

            //   message: `Password Pattern`,
            // },
          ]}
          hasFeedback>
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirm Password"
          name="confirm"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The two passwords that you entered do not match!"));
              },
            }),
          ]}>
          <Input.Password />
        </Form.Item>
        <Row justify="end">
          <Button htmlType="submit">Submit</Button>
        </Row>
      </Form>
      <Row justify="center">
        <Link to={"/login"}> Login</Link>
      </Row>
    </Card>
  );
}
