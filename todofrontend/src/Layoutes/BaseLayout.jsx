import { Card, Layout, Typography, Menu, Row, Col } from "antd";
import React, { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Notification } from "../Components/Notification";
const { Header, Footer, Content } = Layout;
const { Title, Text } = Typography;
export default function BaseLayout({ children }) {
  const location = useLocation();

  // console.log("location : ", location.pathname);

  let initial;
  if (location.pathname == "/") initial = "Home";
  if (location.pathname == "/deleted-tasks") initial = "Trash";
  // console.log("Initial : ", initial);
  const [currentKey, setCurrentKey] = useState(initial);
  // console.log("current key : " + currentKey);

  useEffect(() => {
    if (location.pathname == "/") setCurrentKey("Home");
    if (location.pathname == "deleted-tasks") setCurrentKey("Trash");
  }, [location.pathname]);

  const userLogout = async () => {
    localStorage.setItem("token", null);
    Notification("User Logged Out");
    const token = localStorage.getItem("token");
    console.log(token);
  };

  const menuItems = [
    {
      key: "Home",
      label: <Link to={"/"}>Home</Link>,
    },
    {
      key: "Trash",
      label: <Link to={"/deleted-tasks"}>Trash List</Link>,
    },
  ];

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
        <Menu mode="horizontal" style={{ display: "flex", justifyContent: "center" }} defaultSelectedKeys={[currentKey]} items={menuItems} />
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
