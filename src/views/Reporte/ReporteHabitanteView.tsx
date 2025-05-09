import React, { useEffect, useState } from "react";
import { Typography, Button, Row, Col, Select } from "antd";

const { Title } = Typography;

const ReporteView: React.FC = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);
  useEffect(() => {
    console.log(selectedPdf);
  }, [selectedPdf]);

  const pdfFiles = [
    {
      label: "Batalla de los Godos II",
      value: "/pdf-comunas/ConstanciaDeResidenciaLosGodos.pdf",
    },
    {
      label: "Comunales en Victoria",
      value:
        "/pdf-comunas/Constancia de Residencia Comunales-1-20250203-161723.pdf",
    },
    {
      label: "El Abanico",
      value:
        "/pdf-comunas/2 - Formato Carta de Residencia El Abanico 2022-2024 - 2025.pdf",
    },
  ];

  const handleDownload = () => {
    if (!selectedPdf) return;

    const file = pdfFiles.find((f) => f.value === selectedPdf);
    if (file) {
      const link = document.createElement("a");
      link.href = file.value;
      link.download = file.label + ".pdf";
      link.click();
    }
  };

  return (
    <>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col span={24}>
          <Title level={2}>Constacia de Residencia</Title>
        </Col>
      </Row>
      <div style={{ marginBottom: "16px" }}></div>
      <Row>
        <Col span={24}>
          <Select
            style={{ width: "100%" }}
            placeholder="Seleccione un Consejo Comunal"
            onChange={(e) => {
              setSelectedPdf(e);
            }}
            options={pdfFiles}
          />
        </Col>
      </Row>
      <div style={{ marginBottom: "16px" }}></div>
      <Row gutter={[16, 16]} justify="space-between" align="middle">
        <Col span={24}>
          <Button
            type="primary"
            onClick={handleDownload}
            disabled={!selectedPdf}
            block
          >
            Descargar
          </Button>
        </Col>
      </Row>
    </>
  );
};

export default ReporteView;
