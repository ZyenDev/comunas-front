import React from "react";
import { Table, Typography, Button } from "antd";

const { Title } = Typography;

const ReporteView: React.FC = () => {
  const columns = [
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
      title: "Descripción",
      dataIndex: "descripcion",
      key: "descripcion",
    },
  ];

  const data = [
    {
      key: "1",
      id: "1",
      nombre: "Reporte 1",
      descripcion: "Descripción del reporte 1",
    },
    {
      key: "2",
      id: "2",
      nombre: "Reporte 2",
      descripcion: "Descripción del reporte 2",
    },
  ];

  return (
    <div>
      <Title>Reportes</Title>
      <Table columns={columns} dataSource={data} />
    </div>
  );
};

export default ReporteView;
