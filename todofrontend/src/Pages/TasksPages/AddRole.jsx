import { Card, Col, Row, Table } from "antd";
import React from "react";
import { BaseAPI } from "../../Utils/Api";

export default function AddRole() {
  const createRole = async (values) => {};
  const getRoles = async () => {
    const response = await BaseAPI.get("/roles/get-roles");
    console.log(response);
  };
  const dataSource = [
    {
      key: "2",
      role_id: 1,
      role: "Admin",
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Role ID",
      dataIndex: "role_id",
      key: "role_id",
    },
    {
      title: "Role Title",
      dataIndex: "role",
      key: "role",
    },
  ];

  return (
    <Card>
      <Row>
        <Col span={24} md={12} xs={24}>
          <Card style={{ border: "none" }}>
            <Row>User Profile</Row>
            <Row>User Role : </Row>
            <Row>User Name : </Row>
            <Row>User Email : </Row>
          </Card>
        </Col>
        <Col span={24} md={12} xs={24}>
          <Card style={{ border: "none" }}>
            <Row>Add New Role </Row>
            <Table dataSource={dataSource} columns={columns} />
          </Card>
        </Col>
      </Row>
    </Card>
  );
}
