//habitante
import React, { useEffect, useState } from "react";
import { Table, Layout, Flex, Button, Popconfirm, notification } from "antd";
import { ConsejoComunalInterface } from "../../models/ConsejoComunalModel";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import HabitanteModal from "./HabitanteModal";
import {
  deleteHabitante,
  getHabitanteByViviendaID,
} from "../../controllers/HabitantesController";
import { HabitanteInterface } from "../../models/HabitanteModel";
import { useParams } from "react-router";
import { ViviendaInterface } from "../../models/ViviendaModel";
import { getViviendaById } from "../../controllers/ViviendaController";
import { getAllPaisOrigen } from "../../controllers/PaisOrigenController";
import { PaisOrigenInterface } from "../../models/PaisOrigenModel";
import { useAuth } from "../../components/AuthContext";

const { Content } = Layout;

const Habitante: React.FC = () => {
  const [habitante, setHabitante] = useState<HabitanteInterface[]>();
  const [vivienda, setVivienda] = useState<ViviendaInterface>();
  const [paisorigen, setpaisorigen] = useState<PaisOrigenInterface[]>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const [id_habitante, setUpdateID] = useState<number>();
  const { id_habitantes } = useParams();
  const { token } = useAuth();

  const columns: any = [
    {
      title: "ID",
      dataIndex: "id_habitante",
      key: "id_habitante",
      sorter: (a: ConsejoComunalInterface, b: ConsejoComunalInterface) =>
        b.id_comuna - a.id_comuna,
    },
    {
      title: "Cédula",
      dataIndex: "cedula",
      key: "cedula",
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Edad",
      dataIndex: "edad",
      key: "edad",
    },
    {
      title: "Sexo",
      dataIndex: "sexo",
      key: "sexo",
      //render: (sexo: any) => console.log(sexo),
    },
    {
      title: "Discapacidad",
      dataIndex: "discapacidad",
      key: "discapacidad",
      render: (discapacidad: any) => (discapacidad === 1 ? "Sí" : "No"),
    },
    {
      title: "Etnia",
      dataIndex: "pertenece_etnia",
      key: "pertenece_etnia",
      render: (pertenece_etnia: any) => (pertenece_etnia === 1 ? "Sí" : "No"),
    },
    {
      title: "Nacionalidad",
      dataIndex: "id_nacionalidad",
      key: "id_nacionalidad",
      render: (pertenece_etnia: any) =>
        pertenece_etnia === 2 ? "Venezolano" : "Extrangero",
    },
    {
      title: "País de Origen",
      dataIndex: "id_pais_origen",
      key: "id_pais_origen",
      render: (id_pais: any) => {
        const pais = paisorigen?.find((p) => p.id_pais_origen === id_pais);
        return pais ? pais.nombre : "Venezuela";
      },
    },
    {
      title: "Acción",
      key: "action",
      render: (habitante: HabitanteInterface) => (
        <Flex vertical={false} gap="8px">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            onClick={() => {
              setUpdate(true);
              setOpen(true);
              setUpdateID(habitante.id_habitante);
            }}
          />
          <Popconfirm
            title="¿Desea eliminar éste Habitante?"
            onConfirm={async () => {
              try {
                await deleteHabitante(
                  habitante.id_habitante,
                  token ? token : ""
                );
                openNotificationSuccess("¡Habitante eliminado con exito!");
                gethabitante();
              } catch (error: any) {
                openNotificationError(error?.message || "Error desconocido.");
              }
            }}
            okText="Si"
            cancelText="No"
          >
            <Button type="primary" danger icon={<DeleteFilled />} />
          </Popconfirm>
        </Flex>
      ),
    },
  ];

  const gethabitante = async () => {
    try {
      if (id_habitantes != undefined) {
        let id_habitantes_par = parseInt(id_habitantes);
        //const data = await getHabitanteByViviendaID(id_habitantes_par);
        const data = await getHabitanteByViviendaID(
          id_habitantes_par,
          token ? token : ""
        );
        data.forEach((item: HabitanteInterface) => {
          item.nombre = `${item.primer_nombre} ${item.primer_apellido}`;
        });
        setHabitante(data);
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getVivienda = async () => {
    try {
      if (id_habitantes != undefined) {
        const data = await getViviendaById(
          parseInt(id_habitantes),
          token ? token : ""
        );
        setVivienda(data);
      }
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getpaisOrigen = async () => {
    try {
      const data = await getAllPaisOrigen(token ? token : "");
      setpaisorigen(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };

  useEffect(() => {
    getpaisOrigen();
    getVivienda();
    gethabitante();
  }, []);
  useEffect(() => {
    gethabitante();
  }, [open]);

  const showModal = () => {
    setUpdate(false);
    setOpen(true);
  };

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
    <>
      {contextHolder}
      <Content style={{ padding: "24px", background: "#fff", width: "100%" }}>
        <h1>Nro. Casa: {vivienda?.numero_vivienda}</h1>
        <Table
          title={() => (
            <Flex vertical={false} justify="space-between" align="center">
              <h1>Listado de Habitantes</h1>
              <Button type="primary" onClick={showModal}>
                Añadir Habitante
              </Button>
            </Flex>
          )}
          dataSource={habitante}
          loading={loading}
          columns={columns}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
        <HabitanteModal
          open={open}
          setOpen={setOpen}
          isUpdated={update}
          id_habitante={id_habitante}
        />
      </Content>
    </>
  );
};

export default Habitante;
