import React from "react";
import { Card, Typography, Row, Col } from "antd";

const data = {
  numero_habitantes: 1,
  numero_parlamentarios: 1,
  numero_voceros: 1,
  numero_administradores: 1,
  numero_viviendas: 1,
  numero_comunas: 4,
  numero_consejos_comunales: 2,
};

const ReporteInicioView: React.FC = () => {
  return (
    <div style={{ padding: "20px" }}>
      <Typography.Title level={2} style={{ marginBottom: "20px" }}>
        Reporte de Datos
      </Typography.Title>
      <Row gutter={[16, 16]}>
        {Object.entries(data).map(([key, value]) => (
          <Col xs={24} sm={12} md={8} key={key}>
            <Card>
              <Typography.Title level={4}>
                {key.replace(/_/g, " ").toUpperCase()}
              </Typography.Title>
              <Typography.Text>{value}</Typography.Text>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ReporteInicioView;
