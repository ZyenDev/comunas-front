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
  getItem(
    "Habitante",
    "Habitantes",
    <Link to="/dashboard/habitante">
      {" "}
      <UserOutlined />{" "}
    </Link>
  ),
];

const Dashboard: React.FC = () => {
  //let navigate = useNavigate();
  const [current, SetCurrent] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuSelect = (info: any) => {
    console.log(info.key);
    SetCurrent(info.key);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["1"]}
          theme="light"
          mode="inline"
          items={items}
          onSelect={handleMenuSelect}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }} />
        <Content style={{ margin: "0 16px" }}>
          <h1 style={{ margin: "16px 0" }}>{current}</h1>
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
