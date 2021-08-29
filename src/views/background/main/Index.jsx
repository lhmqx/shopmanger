import React from "react";
import { Layout, Button } from "antd";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import "./index.css";
import { getShopMes } from "../../../http/shopApi";

const { Header, Footer, Sider, Content } = Layout;
let pro;

export default function Index(props) {
  pro = props;
  return (
    <Layout className="layoutMain">
      <Sider className="slider">Sider</Sider>
      <Layout>
        <Header className="header">
          <Button>{React.createElement()}</Button>
        </Header>
        <Content>Content</Content>
        <Footer>Footer</Footer>
      </Layout>
    </Layout>
  );
}

async function login() {
  try {
    let result = await getShopMes();
    console.log(result);
  } catch (error) {
    console.log(error);
  }
  // console.log(token);
}
