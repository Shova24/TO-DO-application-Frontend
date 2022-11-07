import { Card, Layout, Typography, Menu, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Notification } from "../Components/Notification";
const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;
export default function BaseLayout({ children }) {
  const location = useLocation();
  const [currentKey, setCurrentKey] = useState("");

  useEffect(() => {
    setCurrentKey(location.pathname);
  }, [location.pathname]);

  const userLogout = async () => {
    localStorage.setItem("token", null);
    Notification("User Logged Out");
    const token = localStorage.getItem("token");
    console.log(token);
  };

  return (
    <Layout>
      <Header>
        <Row>
          <Col span={8}>
            <Title style={{ color: "White" }}>TODO App</Title>
          </Col>
          <Col span={8}></Col>
          <Col span={8}>
            <Text style={{ color: "White", float: "right" }}>
              <Link to="/login" onClick={userLogout}>
                Logout
              </Link>
            </Text>
          </Col>
        </Row>
      </Header>
      <Content style={{ minHeight: " 100vh" }}>
        <Menu mode="horizontal" defaultSelectedKeys={[currentKey]} style={{ display: "flex", justifyContent: "center" }}>
          <Menu.Item>
            <Link to={"/"}>Home</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to={"/deleted-tasks"}>Trash List</Link>
          </Menu.Item>
        </Menu>
        <Card
          style={{
            justifyContent: "center",
            minHeight: " 90vh",
            backgroundColor: "background: rgba(255, 255, 255, 0.15)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            margin: "40px",
            borderRadius: "20px",
            display: "flex",
            flexDirection: "column",
          }}>
          {children}
        </Card>
      </Content>
    </Layout>
  );
}
