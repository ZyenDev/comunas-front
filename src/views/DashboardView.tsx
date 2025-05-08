import React, { useEffect, useState } from "react";
import {
  UserOutlined,
  HomeOutlined,
  UserAddOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router";
import type { MenuProps } from "antd";
import { Col, Layout, Menu, Row, Typography } from "antd";
import { Outlet } from "react-router";
import { Link } from "react-router";
import { useAuth } from "../components/AuthContext";
import { JSX } from "react/jsx-runtime";
import { isMobile } from "react-device-detect";
import {
  ComunaIcon,
  ConsejoComunalIcon,
  ConstanciaResidenciaIcon,
  ViviendaIcon,
} from "../components/CustomIcon";

const { Content, Sider } = Layout;
const menuItems = [
  {
    key: "users",
    label: "Inicio",
    icon: <HomeOutlined />,
    path: "/dashboard/reportegen",
    roles: ["Administrador", "Parlamentario", "Vocero", "Habitante"],
  },
  {
    key: "regicomuna",
    label: "Comunas",
    icon: <ComunaIcon />,
    path: "/dashboard/comuna",
    roles: ["Administrador", "editor", "viewer"],
  },
  {
    key: "regiconcomuna",
    label: "Consejos Comunales",
    icon: <ConsejoComunalIcon />,
    path: "/dashboard/consejocomunal",
    roles: ["Administrador", "editor"],
  },
  {
    key: "Registrar parlamentario",
    label: "Parlamentarios",
    icon: <UserAddOutlined />,
    path: "/dashboard/registrar",
    roles: ["Administrador", "editor"],
  },
  {
    key: "Registrar Vocero",
    label: "Voceros",
    icon: <UserAddOutlined />,
    path: "/dashboard/registrar",
    roles: ["Parlamentario"],
  },
  {
    key: "Registrar vivienda",
    label: "Viviendas",
    icon: <ViviendaIcon />,
    path: "/dashboard/viviendas",
    roles: ["Vocero"],
  },
  {
    key: "Registrar habitantes",
    label: "Cuentas Habitantes",
    icon: <UserAddOutlined />,
    path: "/dashboard/registrar",
    roles: ["Vocero"],
  },
  {
    key: "habitantes",
    label: "Habitantes",
    icon: <TeamOutlined />,
    path: "viviendas/habitantes/",
    roles: ["Vocero"],
  },
  {
    key: "Reportes",
    label: "Reportes",
    icon: <ConstanciaResidenciaIcon />,
    path: "/dashboard/reporte",
    roles: ["Habitante"],
  },
  {
    key: "Reportes",
    label: "Reportes",
    icon: <ConstanciaResidenciaIcon />,
    path: "/dashboard/reporte/parlamentario",
    roles: ["Administrador", "Parlamentario", "Vocero"],
  },
];

const Dashboard: React.FC = () => {
  const { logout, username, role } = useAuth();
  const navigate = useNavigate();
  const [isColapseMovile, setIsColapse] = useState(false);
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

  useEffect(() => {
    setIsColapse(isMobile);
  }, []);

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
        collapsed={isColapseMovile}
        style={{
          ...siderStyle,
          zIndex: 1000,
          display: "flex",
          flexDirection: "column",
        }}
        collapsedWidth={80} // Width when collapsed
        width={200} // Width when expanded
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
              style={{
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: isColapseMovile ? "center" : "flex-start",
              }}
            >
              <button
                onClick={() => setIsColapse(!isColapseMovile)}
                style={{
                  background: "none",
                  border: "none",
                  color: "white",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <UserOutlined
                  style={{
                    fontSize: "24px",
                    marginRight: isColapseMovile ? 0 : "8px",
                  }}
                />
                {!isColapseMovile && <span>{username}</span>}
              </button>
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
                {!isMobile && "Cerrar Sesión"}
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
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
