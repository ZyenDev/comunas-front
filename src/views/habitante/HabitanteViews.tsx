//habitante
import React, { useEffect, useState } from "react";
import {
  Table,
  Layout,
  Flex,
  Button,
  Divider,
  Form,
  Modal,
  Select,
  Input,
  Popconfirm,
  notification,
} from "antd";
import {
  getAllComunas,
  getComunaByID,
} from "../../controllers/ComunaController";
import {
  createConsejoComunal,
  deleteConsejoComunal,
  getAllConsejoComunal,
  getConsejoComunalById,
  updateConsejoComuna,
} from "../../controllers/ConsejoComunalController";
import { ConsejoComunalInterface } from "../../models/ConsejoComunalModel";
import {
  getAllAmbitos,
  getAmbito,
} from "../../controllers/AmbitoTerritorialController";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/es/select";
import HabitanteModal from "./HabitanteModal";
import {
  deleteHabitante,
  getAllHabitantes,
} from "../../controllers/ControllerHabitantes";
import { HabitanteInterface } from "../../models/HabitanteModel";
import { useParams } from "react-router";

const { Content } = Layout;

const Habitante: React.FC = () => {
  const [habitante, setHabitante] = useState<HabitanteInterface[]>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [id_consejo_update, setUpdateID] = useState<number>();
  const { id_habitantes } = useParams();
  console.log("habitante here : " + id_habitantes);

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
      title: "Primer Nombre",
      dataIndex: "primer_nombre",
      key: "primer_nombre",
    },
    {
      title: "Segundo Nombre",
      dataIndex: "segundo_nombre",
      key: "segundo_nombre",
    },
    {
      title: "Primer Apellido",
      dataIndex: "primer_apellido",
      key: "primer_apellido",
    },
    {
      title: "Segundo Apellido",
      dataIndex: "segundo_apellido",
      key: "segundo_apellido",
    },
    {
      title: "Fecha de Nacimiento",
      dataIndex: "fecha_nacimiento",
      key: "fecha_nacimiento",
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
      render: (sexo: any) => (sexo === "1" ? "Masculino" : "Femenino"),
    },
    {
      title: "Discapacidad",
      dataIndex: "discapacidad",
      key: "discapacidad",
      render: (discapacidad: any) => (discapacidad === 1 ? "Sí" : "No"),
    },
    {
      title: "Pertenece a Etnia",
      dataIndex: "pertenece_etnia",
      key: "pertenece_etnia",
      render: (pertenece_etnia: any) => (pertenece_etnia === 1 ? "Sí" : "No"),
    },
    {
      title: "Nacionalidad",
      dataIndex: "id_nacionalidad",
      key: "id_nacionalidad",
    },
    {
      title: "País de Origen",
      dataIndex: "id_pais_origen",
      key: "id_pais_origen",
    },
    {
      title: "Vivienda",
      dataIndex: "id_vivienda",
      key: "id_vivienda",
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
                await deleteHabitante(habitante.id_habitante);
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
      const data = await getAllHabitantes();
      console.log(data);
      setHabitante(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };

  useEffect(() => {
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

  /*
    1 = masculino
    2 = femenino
 */

  return (
    <div>
      {contextHolder}
      <Content style={{ padding: "24px", background: "#fff" }}>
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
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
        <HabitanteModal
          open={open}
          setOpen={setOpen}
          isUpdated={update}
          id_habitante={id_consejo_update}
        />
      </Content>
    </div>
  );
};

export default Habitante;
