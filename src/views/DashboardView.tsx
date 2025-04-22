import React from "react";
import {
  UserOutlined,
  DashboardOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { MenuProps } from "antd";
import { Col, Layout, Menu, Row, Typography } from "antd";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../components/AuthContext";
import { JSX } from "react/jsx-runtime";

const { Content, Sider } = Layout;
// const currentUserRole = "admin";
//const currentUserRole = "parlamentario";
//const currentUserRole = "vocero";

//new menu items
const menuItems = [
  {
    key: "users",
    label: "Usuario",
    icon: <UserOutlined />,
    path: "/dashboard/usuario",
    roles: ["Administrador"],
  },
  {
    key: "regicomuna",
    label: "Registar comunal",
    icon: <DashboardOutlined />,
    path: "/dashboard/comuna",
    roles: ["Administrador", "editor", "viewer"],
  },
  {
    key: "regiconcomuna",
    label: "Registrar c.comunal",
    icon: <SettingOutlined />,
    path: "/dashboard/consejocomunal",
    roles: ["Administrador", "editor"],
  },
  {
    key: "Registrar parlamentario",
    label: "Registrar parlamentario",
    icon: <SettingOutlined />,
    path: "/dashboard/registrar",
    roles: ["Administrador", "editor"],
  },
  {
    key: "Registrar Vocero",
    label: "Registrar Vocero",
    icon: <SettingOutlined />,
    path: "/dashboard/registrar",
    roles: ["Parlamentario"],
  },
  {
    key: "Registrar vivienda",
    label: "Registrar vivienda",
    icon: <SettingOutlined />,
    path: "/dashboard/viviendas",
    roles: ["Vocero"],
  },
  {
    key: "Registrar habitantes",
    label: "Registrar habitantes",
    icon: <SettingOutlined />,
    path: "/dashboard/registrar",
    roles: ["Vocero"],
  },
  {
    key: "habitantes",
    label: "Habitantes",
    icon: <SettingOutlined />,
    path: "viviendas/habitantes/0",
    roles: ["Administrador", "Parlamentario", "Vocero"],
  },
  {
    key: "Reportes",
    label: "Reportes",
    icon: <SettingOutlined />,
    path: "/dashboard/reporte",
    roles: ["Administrador", "Parlamentario", "Vocero"],
  },
];

const Dashboard: React.FC = () => {
  const { logout, username, role } = useAuth();
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

  function filterMenuItemsByRole(
    menuItems: {
      key: string;
      label: string;
      icon: JSX.Element;
      path: string;
      roles: string[];
    }[],
    currentUserRole: string
  ): MenuProps["items"] {
    return menuItems
      .filter((item) => item.roles.includes(currentUserRole))
      .map((item) => ({
        key: item.key,
        icon: item.icon,
        label: <Link to={item.path}>{item.label}</Link>,
      }));
  }

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
            <div
              style={{ padding: "16px", display: "flex", alignItems: "center" }}
            >
              <UserOutlined
                style={{ fontSize: "24px", marginRight: "8px", color: "white" }}
              />
              <span style={{ color: "white" }}>{username}</span>
            </div>
            <div className="demo-logo-vertical" />
            <Menu
              theme="dark"
              mode="inline"
              defaultSelectedKeys={["users"]}
              items={filterMenuItemsByRole(menuItems, role ? role : "")}
            />
          </div>
          <div style={{ marginTop: "auto" }}>
            <Menu theme="dark" mode="inline">
              <Menu.Item
                key="logout"
                icon={<UserOutlined />}
                onClick={() => {
                  logout();
                  navigate("/");
                }}
              >
                Cerrar Sesión
              </Menu.Item>
            </Menu>
          </div>
        </div>
      </Sider>
      <Layout>
        <Row
          style={{
            minHeight: "50px",
            boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Col
            md={24}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              style={{ fontSize: "18px", color: "black", fontWeight: "bold" }}
            >
              {role}
            </Typography>
          </Col>
        </Row>

        <Content style={{ margin: "0 16px" }}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
