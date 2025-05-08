import React, { useEffect, useState } from "react";
import {
  Typography,
  Row,
  Col,
  Select,
  InputNumber,
  Table,
  notification,
} from "antd";
import { getReporteParlamentario } from "../../controllers/ReportesController";
import { useAuth } from "../../components/AuthContext";
import { getAllComunas } from "../../controllers/ComunaController";

const { Title } = Typography;

const columnsHabitante = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Nombre",
    dataIndex: "primer_nombre",
    key: "primer_nombre",
  },
  {
    title: "Apellido",
    dataIndex: "primer_apellido",
    key: "primer_apellido",
  },
  {
    title: "Edad",
    dataIndex: "edad",
    key: "edad",
  },
];
const columnsVivienda = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
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
const columnsDiscapacitados = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (_: any, __: any, index: number) => index + 1,
  },
  {
    title: "Nombre",
    dataIndex: "primer_nombre",
    key: "primer_nombre",
  },
  {
    title: "Apellido",
    dataIndex: "primer_apellido",
    key: "primer_apellido",
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
  const [api, contextHolder] = notification.useNotification();

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
      try {
        const res = await getReporteParlamentario(
          token ? token : "",
          idComuna,
          idTipoReporte,
          idEdadMin ? idEdadMin : 0,
          idEdadMax ? idEdadMax : 99
        );
        console.log(res);
        setTipoReporte(res.tipo_reporte ? res.tipo_reporte : null);
        setReporteData(res.data ? res.data : null);
        console.log(res);
        openNotificationSuccess("Reporte generado con exito");
      } catch (error) {
        console.log(error);
        openNotificationError("Error al obtener el reporte");
      }
    };

    if (idComuna) {
      getReporte();
    }
  }, [idComuna, idTipoReporte, idEdadMin, idEdadMax]);

  const openNotificationError = (msg: string) => {
    api.error({
      message: msg,
    });
  };
  const openNotificationSuccess = (msg: string) => {
    api.success({
      message: msg,
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      {contextHolder}
      <Title level={2} style={{ marginBottom: "20px" }}>
        Reporte
      </Title>
      <Row gutter={[16, 16]}>
        <Col md={6}>
          <Typography>Seleccionar Comuna</Typography>
          <Select
            defaultValue="Selecciona una Comuna"
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
            defaultValue="Selecciona el Tipo de Reporte"
            loading={loading}
            onChange={(e: any) => {
              console.log(e);
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
        {/* <Col md={6}>
          <Typography>Edad Minima</Typography>
          <InputNumber
            style={{ width: "100%" }}
            min={1}
            max={99}
            defaultValue={0}
            onChange={(e: any) => {
              setIdEdadMin(e);
            }}
          />{" "}
        </Col> */}
        {/* <Col md={6}>
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
        </Col> */}
      </Row>
      <Row gutter={[16, 16]}>
        <Col md={24}>
          <Title level={4}>{tipoReporte}</Title>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        {/* habitante */}
        {idTipoReporte === "habitantes" && (
          <Col md={24}>
            {/* "id": h.id, "nombre": h.nombre, "edad": h.edad  */}
            <Table
              columns={columnsHabitante}
              dataSource={ReporteData}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
            />
          </Col>
        )}
        {/* Viviendas */}
        {idTipoReporte === "viviendas" && (
          <Col md={24}>
            {/* {"id": v.id, "direccion": v.direccion, "estado": v.estado} for v in viviendas - array */}
            <Table
              columns={columnsVivienda}
              dataSource={ReporteData}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
            />
          </Col>
        )}
        {/* Habitantes Discapacitados */}
        {idTipoReporte === "habitantes_discapacitados" && (
          <Col md={24}>
            {/* {"id": h.id, "nombre": h.nombre, "discapacidad": h.discapacidad} for h in habitantes_discapacitados */}
            <Table
              columns={columnsDiscapacitados}
              dataSource={ReporteData}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
            />
          </Col>
        )}
      </Row>
    </div>
  );
};

export default ReporteParlamentario;
