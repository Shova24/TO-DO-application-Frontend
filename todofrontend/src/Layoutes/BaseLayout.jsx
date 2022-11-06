import { Card, Layout, Typography } from "antd";
import React from "react";
const { Header, Footer, Content } = Layout;
const { Title } = Typography;
export default function BaseLayout({ children }) {
  return (
    <Layout>
      <Header style={{ display: "flex", justifyContent: "center" }}>
        <Title style={{ color: "White" }}>TODO App</Title>
      </Header>
      <Content style={{ minHeight: " 100vh" }}>
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
