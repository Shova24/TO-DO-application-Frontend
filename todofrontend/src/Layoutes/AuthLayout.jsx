import { Card, Layout, Space } from "antd";
import React from "react";
const { Header, Footer, Content } = Layout;

export default function AuthLayOut({ children }) {
  return (
    <Layout>
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
      <Footer style={{ height: "2px", backgroundColor: "teal", textAlign: "center" }}>@Copy- right Footer</Footer>
    </Layout>
  );
}
