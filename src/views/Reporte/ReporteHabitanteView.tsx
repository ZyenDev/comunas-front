import React, { useEffect, useState, useRef } from "react";
import { Typography, Button, Space, Divider } from "antd";
import { PrinterOutlined } from "@ant-design/icons";

const { Title, Paragraph, Text } = Typography;

const ReporteView: React.FC = () => {
  const [date, setToday] = useState<Date>(new Date());
  const printRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const today = new Date();
    setToday(today);
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <Space style={{ marginBottom: 24 }}>
        <Button type="primary" icon={<PrinterOutlined />}>
          Imprimir / Guardar como PDF
        </Button>
      </Space>

      <div ref={printRef} style={{ background: "#fff", padding: 32 }}>
        <Typography style={{ fontFamily: "serif", color: "#000" }}>
          <Title
            level={4}
            style={{ textAlign: "center", textTransform: "uppercase" }}
          >
            República Bolivariana de Venezuela
          </Title>
          <Paragraph style={{ textAlign: "center" }}>
            M.P.P. para las Comunas y Mov. Sociales
            <br />
            <strong>Consejo Comunal "Comunales en Victoria"</strong>
            <br />
            Maturín, Estado Monagas
            <br />
            RIF: C-501521883
          </Paragraph>

          <Title
            level={3}
            style={{ textAlign: "center", textDecoration: "underline" }}
          >
            Constancia de Residencia
          </Title>

          <Paragraph style={{ textAlign: "justify" }}>
            Nosotros los abajo firmantes, hacemos constar por medio de la
            presente que el (la) ciudadano (a){" "}
            <Text underline>_________________________________</Text>,
            venezolano, portador de la cédula de identidad No V-
            <Text underline>________________</Text>, tiene su residencia en el
            ámbito geográfico de nuestro Consejo Comunal “Comunales en
            Victoria”, y habita de forma permanente con dirección:{" "}
            <Text underline>
              _____________________________________________________
            </Text>
            , Parroquia Altos de los Godos, Maturín, Estado Monagas, desde
            aproximadamente: <Text underline>______</Text> años.
          </Paragraph>

          <Paragraph style={{ textAlign: "center", width: "100%" }}>
            Constancia que se emite en Maturín, el <Text>{date.getDate()}</Text>{" "}
            días del mes de{" "}
            <Text>
              {date.toLocaleString("es-ES", { month: "long" })} de{" "}
              {date.getFullYear()}
            </Text>
          </Paragraph>

          <Divider />

          <Paragraph style={{ textAlign: "center" }}>
            <strong>ATENTAMENTE</strong>
            <br />
            Por el Consejo Comunal "Comunales en Victoria"
          </Paragraph>

          <Divider />

          <div
            style={{
              textAlign: "center",
              marginTop: 48,
              display: "flex",
              alignContent: "center",
              justifyContent: "space-around",
            }}
          >
            <Paragraph>
              <Text underline>__________________________</Text>
              <br />
              COMITÉ DE COMISIÓN ELECTORAL
            </Paragraph>

            <Paragraph>
              <Text underline>__________________________</Text>
              <br />
              UNIDAD DE CONTRALORÍA SOCIAL
            </Paragraph>

            <Paragraph>
              <Text underline>______________________________</Text>
              <br />
              UNIDAD ADMINISTRATIVA Y FINANCIERA
            </Paragraph>
          </div>
        </Typography>
      </div>
    </div>
  );
};

export default ReporteView;
