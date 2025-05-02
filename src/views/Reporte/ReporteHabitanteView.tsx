import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Space, Divider, Row, Col, Select } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import pdf1 from "../../assets/pdf-comunas/Constancia de Residencia Los Godos.pdf";

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
          <Space direction="vertical" style={{ width: "100%" }}>
            <iframe
              src={pdf1}
              width="100%"
              height="500px"
              style={{ border: "none", display: "none" }}
              title="PDF Preview"
              onLoad={(e) => {
                const iframe = e.target as HTMLIFrameElement;
                iframe.style.display = "block";
                const loadingElement =
                  document.getElementById("loading-indicator");
                if (loadingElement) {
                  loadingElement.style.display = "none";
                }
              }}
            />
            <div id="loading-indicator" style={{ textAlign: "center" }}>
              <Button type="primary" loading>
                Cargando reporte...
              </Button>
            </div>
          </Space>
        </Col>
      </Row>
    </>
  );
};

export default ReporteView;
