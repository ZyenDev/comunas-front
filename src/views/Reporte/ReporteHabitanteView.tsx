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
      value: "/public/pdf-comunas/1 - Formato Carta de Residencia Batalla de los godos2022-2024 - 2025 -.pdf",
    },
    {
      label: "Guanaguanay",
      value:
        "/public/pdf-comunas/2 - Formato Carta de Residencia Guanaguanay 2022-2024 - 2025.pdf",
    },
    {
      label: "Comunales en Victoria",
      value:
        "/public/pdf-comunas/3 - Formato Carta de Residencia Comunales en Victoria 2022-2024 - 2025 -.pdf",
    },
        {
      label: "Vencedores de los Godos",
      value:
        "/public/pdf-comunas/4 - Formato Carta de Residencia Vencedores de los godos2022-2024 - 2025.pdf",
    },
        {
      label: "Heroes de los Godos UP2",
      value:
        "/public/pdf-comunas/5 - Formato Carta de Residencia Heroes de los godos UP2 2022-2024 - 2025 -.pdf",
    },
        {
      label: "El Renacer de los Godos 1A",
      value:
        "/public/pdf-comunas/6 - Formato Carta de Residencia EL Renacer de los godos 1A 2022-2024 - 2025.pdf",
    },
        {
      label: "Godos 1B",
      value:
        "/public/pdf-comunas/7 - Formato Carta de Residencia Godos 1B 2022-2024 - 2025 - c.pdf",
    },
        {
      label: "Batalla de los Godos 3R",
      value:
        "/public/pdf-comunas/8 - Formato Carta de Residencia Batalla de los Godos 3R2022-2024 - 2025 -.pdf",
    },
        {
      label: "Jose Francisco Bermudez",
      value:
        "/public/pdf-comunas/9 - Formato Carta de Jose Francisco Bermudez 2022-2024 - 2025 - copia - copia (6).pdf",
    },
        {
      label: "El Abanico",
      value:
        "/public/pdf-comunas/10 - Formato Carta de Residencia El Abanico 2022-2024 - 2025.pdf",
    },
        {
      label: "Godos 1C",
      value:
        "/public/pdf-comunas/11 - Formato Carta de Residencia Godos 1C2022-2024 - 2025 -.pdf",
    },
        {
      label: "Juana la Avanzadora",
      value:
        "/public/pdf-comunas/12 - Formato Carta de Residencia Juana la avanzadora 2022-2024 - 2025.pdf",
    },
        {
      label: "UP1 La Resistencia",
      value:
        "/public/pdf-comunas/13- Formato Carta de Residencia UP1 La Resistencia 2022-2024 - 2025.pdf",
    },
        {
      label: "Jose Maria Vargas",
      value:
        "/public/pdf-comunas/14 - Formato Carta de Residencia Jose Maria Varga2022-2024 - 2025 -.pdf",
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
