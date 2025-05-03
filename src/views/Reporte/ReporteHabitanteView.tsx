import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Space, Divider, Row, Col, Select } from "antd";
import pdf1 from "../../../public/pdf-comunas/ConstanciaDeResidenciaLosGodos.pdf";
import PdfViewer from "../../components/PdfViewer";

const { Title, Paragraph, Text } = Typography;

const ReporteView: React.FC = () => {
  useEffect(() => {}, []);

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col span={24}>
          <Title level={2}>Reporte de Habitantes</Title>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Select
            placeholder="Seleccione una comuna"
            options={[
              { value: "1", label: "Comuna 1" },
              { value: "2", label: "Comuna 2" },
              { value: "3", label: "Comuna 3" },
            ]}
          />
          <Button type="primary">Imprimir</Button>
        </Col>
      </Row>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col span={24}>
          <PdfViewer fileUrl="/ConstanciaDeResidenciaLosGodos.pdf" />
        </Col>
      </Row>
    </>
  );
};

export default ReporteView;
