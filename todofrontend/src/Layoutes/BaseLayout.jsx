import { Card, Layout, Typography, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
const { Header, Footer, Content } = Layout;
const { Title } = Typography;
export default function BaseLayout({ children }) {
  const location = useLocation();
  const [currentKey, setCurrentKey] = useState("");

  useEffect(() => {
    setCurrentKey(location.pathname);
  }, [location.pathname]);
  console.log("====================================");
  console.log("Current Key : ", currentKey);
  console.log("====================================");

  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "center" }}>
        <Title style={{ color: "White" }}>TODO App</Title>
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
