import React, { useEffect, useState } from "react";
import { Card, Typography, Row, Col } from "antd";
import { getReporteGen } from "../../controllers/ReportesController";
import { useAuth } from "../../components/AuthContext";
import { ReportesModelo } from "../../models/ReportesModelo";

const ReporteView: React.FC = () => {
  const [reporte, setReporte] = React.useState<ReportesModelo>();
  const [loading, setLoading] = useState(false);
  const { token } = useAuth();

  useEffect(() => {
    const getReporte = async () => {
      setLoading(true);
      try {
        const response = await getReporteGen(token ? token : "");
        setLoading(false);
        setReporte(response);
      } catch (error) {
        setLoading(false);
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
          <Card loading={loading} title="Número de Habitantes" bordered={false}>
            <Typography.Text>{reporte?.numero_habitantes}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            loading={loading}
            title="Número de Parlamentarios"
            bordered={false}
          >
            <Typography.Text>{reporte?.numero_parlamentarios}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading} title="Número de Voceros" bordered={false}>
            <Typography.Text>{reporte?.numero_viviendas}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            loading={loading}
            title="Número de Administradores"
            bordered={false}
          >
            <Typography.Text>{reporte?.numero_administradores}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading} title="Número de Viviendas" bordered={false}>
            <Typography.Text>{reporte?.numero_viviendas}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card loading={loading} title="Número de Comunas" bordered={false}>
            <Typography.Text>{reporte?.numero_comunas}</Typography.Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} md={8} lg={6}>
          <Card
            loading={loading}
            title="Número de Consejos Comunales"
            bordered={false}
          >
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
