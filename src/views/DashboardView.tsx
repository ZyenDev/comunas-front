import React from "react";
import {
  UsergroupAddOutlined,
  HomeOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../components/AuthContext";

const { Content, Sider } = Layout;

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
];

const Dashboard: React.FC = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
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
      <Sider
        style={{
          ...siderStyle,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div>
            {/* <div
              style={{ padding: "16px", display: "flex", alignItems: "center" }}
            >
              <UserOutlined
                style={{ fontSize: "24px", marginRight: "8px", color: "white" }}
              />
              <span style={{ color: "white" }}>Username</span>
            </div> */}
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["4"]}
              items={items}
            />
          </div>
          <div style={{ marginTop: "auto" }}>
            <Menu theme="dark" mode="inline">
              <Menu.Item
                key="logout"
                icon={<UserOutlined />}
                onClick={() => {
                  logout();
                  setTimeout(() => {
                    navigate("/");
                  }, 2000);
                }}
              >
                Cerrar Sesión
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Sider>
      <Layout>
        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
