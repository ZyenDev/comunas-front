import React, { useEffect, useState } from "react";
import { Typography, Row, Col, Select, InputNumber, Table } from "antd";
import { getReporteParlamentario } from "../../controllers/ReportesController";
import { useAuth } from "../../components/AuthContext";
import { getAllComunas } from "../../controllers/ComunaController";

const { Title } = Typography;

//"id": h.id, "nombre": h.nombre, "edad": h.edad
const columnsHabitante = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "age",
  },
  {
    title: "Edad",
    dataIndex: "edad",
    key: "edad",
  },
];
//{"id": v.id, "direccion": v.direccion, "estado": v.estado}
const columnsVivienda = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Dirección",
    dataIndex: "direccion",
    key: "direccion",
  },
  {
    title: "Estado",
    dataIndex: "estado",
    key: "estado",
  },
];
//"id": h.id, "nombre": h.nombre, "discapacidad": h.discapacidad
const columnsDiscapacitados = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "Nombre",
    dataIndex: "nombre",
    key: "nombre",
  },
  {
    title: "Discapacidad",
    dataIndex: "discapacidad",
    key: "discapacidad",
  },
];

const ReporteParlamentario: React.FC = () => {
  const { token } = useAuth();
  const [ComunasOpt, setComunas] = useState<any>(null);
  const [idComuna, setIdComuna] = useState<any>();
  const [idTipoReporte, setIdTipoReporte] = useState<any>();
  const [idEdadMin, setIdEdadMin] = useState<any>();
  const [idEdadMax, setIdEdadMax] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [tipoReporte, setTipoReporte] = useState<any>(null);

  const [ReporteData, setReporteData] = useState<any>(null);

  useEffect(() => {
    const GetComunas = async () => {
      setLoading(true);
      const data = await getAllComunas(token ? token : "");
      const formattedData = data.map((comuna: any) => ({
        value: comuna.id_comuna,
        label: comuna.nombre,
      }));
      setComunas(formattedData);
      setLoading(false);
    };

    GetComunas();
  }, []);

  useEffect(() => {
    const getReporte = async () => {
      const res = await getReporteParlamentario(
        token ? token : "",
        idComuna,
        idTipoReporte,
        idEdadMin ? idEdadMin : 0,
        idEdadMax ? idEdadMax : 99
      );
      setTipoReporte(res.tipo_reporte ? res.tipo_reporte : null);
      setReporteData(res.data ? res.data : null);
      console.log(res);
    };
    if (idComuna) {
      getReporte();
    }
  }, [idComuna]);

  return (
    <div style={{ padding: "20px" }}>
      <Title level={2} style={{ marginBottom: "20px" }}>
        Reporte de Parlamentario
      </Title>
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <Typography>seleccionar columna</Typography>
          <Select
            defaultValue="selecciona una comuna columna"
            loading={loading}
            onChange={(e: any) => {
              setIdComuna(e);
            }}
            style={{ width: "100%" }}
            options={ComunasOpt}
          />
        </Col>
        <Col md={6}>
          <Typography>Tipo Reporte</Typography>
          <Select
            defaultValue="selecciona el tipo de reporte"
            loading={loading}
            onChange={(e: any) => {
              setIdTipoReporte(e);
            }}
            style={{ width: "100%" }}
            options={[
              { value: "habitantes", label: "Habitantes" },
              { value: "viviendas", label: "Viviendas" },
              {
                value: "habitantes_discapacitados",
                label: "Habitantes Discapacitados",
              },
            ]}
          />
        </Col>
        <Col md={6}>
          <Typography>Edad Minima</Typography>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            max={99}
            defaultValue={0}
            onChange={(e: any) => {
              setIdEdadMin(e);
            }}
          />
        </Col>
        <Col md={6}>
          <Typography>Edad Maxima</Typography>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            max={99}
            defaultValue={0}
            onChange={(e: any) => {
              setIdEdadMax(e);
            }}
          />
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col md={24}>{tipoReporte}</Col>
      </Row>
      <Row gutter={[16, 16]}>
        {/* habitante */}
        {idTipoReporte === "habitantes" && (
          <Col md={24}>
            {/* "id": h.id, "nombre": h.nombre, "edad": h.edad  */}
            <Table columns={columnsHabitante} dataSource={ReporteData} />
          </Col>
        )}
        {/* Viviendas */}
        {idTipoReporte === "viviendas" && (
          <Col md={24}>
            {/* {"id": v.id, "direccion": v.direccion, "estado": v.estado} for v in viviendas - array */}
            <Table columns={columnsVivienda} dataSource={ReporteData} />
          </Col>
        )}
        {/* Habitantes Discapacitados */}
        <Col md={24}>
          {/* {"id": h.id, "nombre": h.nombre, "discapacidad": h.discapacidad} for h in habitantes_discapacitados */}
          <Table columns={columnsDiscapacitados} dataSource={ReporteData} />
        </Col>
      </Row>
    </div>
  );
};

export default ReporteParlamentario;
