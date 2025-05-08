import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import { getReporteGen } from "../../controllers/ReportesController";
import { useAuth } from "../../components/AuthContext";
import { ReportesModelo } from "../../models/ReportesModelo";

const ReporteView: React.FC = () => {
  const [reporte, setReporte] = React.useState<ReportesModelo>();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();
  const { role } = useAuth();

  useEffect(() => {
    const getReporte = async () => {
      setLoading(true);
      try {
        const response = await getReporteGen(token ? token : "");
        setLoading(false);
        setReporte(response);
      } catch (error) {
        setLoading(false);
        console.error("Error buscando datos de Reporte:", error);
      }
    };
    getReporte();
  }, []);
  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2} style={{ marginBottom: "20px" }}>
        Reporte de Datos
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {role == "Administrador" && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Comunas" bordered={false}>
              <Typography.Text>{reporte?.numero_comunas}</Typography.Text>
            </Card>
          </Col>
        )}
        {role == "Administrador" && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Consejos Comunales" bordered={false}>
              <Typography.Text>
                {reporte?.numero_consejos_comunales}
              </Typography.Text>
            </Card>
          </Col>
        )}
        {role == "Administrador" && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Administradores" bordered={false}>
              <Typography.Text>
                {reporte?.numero_administradores}
              </Typography.Text>
            </Card>
          </Col>
        )}
        {role == "Administrador" && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Parlamentarios" bordered={false}>
              <Typography.Text>
                {reporte?.numero_parlamentarios}
              </Typography.Text>
            </Card>
          </Col>
        )}
        {(role == "Administrador" || "Parlamentario") && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Voceros" bordered={false}>
              <Typography.Text>{reporte?.numero_voceros}</Typography.Text>
            </Card>
          </Col>
        )}
        {(role == "Administrador" || "Parlamentario" || "Vocero") && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Habitantes" bordered={false}>
              <Typography.Text>{reporte?.numero_habitantes}</Typography.Text>
            </Card>
          </Col>
        )}
        {(role == "Administrador" || "Parlamentario" || "Vocero") && (
          <Col xs={24} sm={12} md={8} lg={6}>
            <Card loading={loading} title="Viviendas" bordered={false}>
              <Typography.Text>{reporte?.numero_viviendas}</Typography.Text>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ReporteView;
