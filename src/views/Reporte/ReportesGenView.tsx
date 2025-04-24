import React, { useEffect } from "react";
import { Card, Typography, Row, Col } from "antd";
import { getReporteGen } from "../../controllers/ReportesController";
import { useAuth } from "../../components/AuthContext";
import { ReportesModelo } from "../../models/ReportesModelo";
import { report } from "process";

const ReporteView: React.FC = () => {
  const [reporte, setReporte] = React.useState<ReportesModelo>();
  const { token } = useAuth();

  useEffect(() => {
    const getReporte = async () => {
      try {
        const response = await getReporteGen(token ? token : "");
        setReporte(response);
      } catch (error) {
        console.error("Error fetching report data:", error);
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
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Habitantes" bordered={false}>
            <Typography.Text>{reporte?.numero_habitantes}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Parlamentarios" bordered={false}>
            <Typography.Text>{reporte?.numero_parlamentarios}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Voceros" bordered={false}>
            <Typography.Text>{reporte?.numero_viviendas}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Administradores" bordered={false}>
            <Typography.Text>{reporte?.numero_administradores}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Viviendas" bordered={false}>
            <Typography.Text>{reporte?.numero_viviendas}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Comunas" bordered={false}>
            <Typography.Text>{reporte?.numero_comunas}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card title="Número de Consejos Comunales" bordered={false}>
            <Typography.Text>
              {reporte?.numero_consejos_comunales}
            </Typography.Text>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ReporteView;
