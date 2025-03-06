import React, { useState } from "react";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { Outlet } from "react-router";
import { Link } from "react-router";

const { Header, Content, Footer, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(
    "Consejos Comunales",
    "Consejos Comunales",
    <Link to="/dashboard/consejocomunal">
      <UsergroupAddOutlined />
    </Link>
  ),
  getItem(
    "Comunas",
    "Comunas",
    <Link to="/dashboard/comuna">
      {" "}
      <HomeOutlined />{" "}
    </Link>
  ),
  getItem(
    "Vivienda",
    "Viviendas",
    <Link to="/dashboard/viviendas">
      {" "}
      <HomeOutlined />{" "}
    </Link>
  ),
  // getItem(
  //   "Habitante",
  //   "Habitantes",
  //   <Link to="/dashboard/habitante">
  //     {" "}
  //     <UserOutlined />{" "}
  //   </Link>
  // ),
];

const Dashboard: React.FC = () => {
  //let navigate = useNavigate();
  const [current, SetCurrent] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  // const {
  //   token: { colorBgContainer, borderRadiusLG },
  // } = theme.useToken();

  const handleMenuSelect = (info: any) => {
    console.log(info.key);
    SetCurrent(info.key);
  };

  const siderStyle: React.CSSProperties = {
    overflow: "auto",
    height: "100vh",
    position: "sticky",
    insetInlineStart: 0,
    top: 0,
    bottom: 0,
    scrollbarWidth: "thin",
    scrollbarGutter: "stable",
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider style={{ ...siderStyle, zIndex: 1000 }}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={items}
        />
      </Sider>
      <Layout>
        {/* <Header style={{ padding: 0, background: colorBgContainer }} /> */}
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
        {/* <Footer style={{ textAlign: "center" }}>
          Universidad Bolivariana de Venezuela ©{new Date().getFullYear()}
        </Footer> */}
      </Layout>
    </Layout>
  );
};

export default Dashboard;
