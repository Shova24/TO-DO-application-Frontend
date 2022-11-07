import { Card } from "antd";
import im_404 from "../image/img-404.jpg";
import React from "react";

export default function PageNotFound() {
  return (
    <Card style={{ border: "none", overflow: "auto" }}>
      <div style={{ float: "right" }}>
        <img src={im_404} alt="404" width="100%" />
      </div>
    </Card>
  );
}
