//habitante
import React, { useEffect, useState } from "react";
import {
  Table,
  Layout,
  Flex,
  Button,
  Popconfirm,
  notification,
  Tooltip,
} from "antd";
import {
  getAllVivienda,
  deleteVivienda,
} from "../../controllers/ViviendaController";
import { ViviendaInterface } from "../../models/ViviendaModel";
import { DeleteFilled, EditOutlined, PlusOutlined } from "@ant-design/icons";
import ModalVivienda from "./ViviendaModal";
import { useNavigate } from "react-router";

const { Content } = Layout;

const viviendas: React.FC = () => {
  const [vienda, setVivienda] = useState<ViviendaInterface[]>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [id_vivienda_update, setUpdateID] = useState<number>();
  let navigate = useNavigate();

  const columns = [
    {
      title: "ID",
      dataIndex: "id_vivienda",
      key: "id_vivienda",
      sorter: (a: any, b: any) => a.id_vivienda - b.id_vivienda,
    },
    {
      title: "Nro Vivienda",
      dataIndex: "numero_vivienda",
      key: "numero_vivienda",
    },
    {
      title: "Cant. Habitantes",
      dataIndex: "cantidad_habitantes",
      key: "cantidad_habitantes",
    },
    {
      title: "Cant. Familias",
      dataIndex: "cantidad_familias",
      key: "cantidad_familias",
    },
    {
      title: "Cant. Baños",
      dataIndex: "cantidad_banos",
      key: "cantidad_banos",
    },
    {
      title: "Cant. Cuartos",
      dataIndex: "cantidad_cuartos",
      key: "cantidad_cuartos",
    },
    {
      title: "Ubicación",
      dataIndex: "id_ubicacion",
      key: "id_ubicacion",
    },
    {
      title: "Consejo Comunal",
      dataIndex: "id_consejo_comunal",
      key: "id_consejo_comunal",
    },
    {
      title: "Tipo de Vivienda",
      dataIndex: "id_tipo_vivienda",
      key: "id_tipo_vivienda",
    },
    {
      title: "Tipo de Techo",
      dataIndex: "id_tipo_techo",
      key: "id_tipo_techo",
    },
    {
      title: "Tipo de Pared",
      dataIndex: "id_tipo_pared",
      key: "id_tipo_pared",
    },
    {
      title: "Tipo de Piso",
      dataIndex: "id_tipo_piso",
      key: "id_tipo_piso",
    },
    {
      title: "Situación de Vivienda",
      dataIndex: "id_situacion_vivienda",
      key: "id_situacion_vivienda",
    },
    {
      title: "Tipo de Ocupación de Vivienda",
      dataIndex: "id_tipo_ocupacion_vivienda",
      key: "id_tipo_ocupacion_vivienda",
    },
    {
      title: "Acción",
      key: "action",
      render: (vivienda: ViviendaInterface) => (
        <Flex vertical={false} gap="8px">
          <Tooltip title="editar">
            <Button
              type="primary"
              icon={<EditOutlined />}
              size="middle"
              onClick={() => {
                console.log(vivienda);
                setUpdate(true);
                setOpen(true);
                setUpdateID(vivienda.id_vivienda);
              }}
            />
          </Tooltip>
          <Tooltip title="info">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              size="middle"
              onClick={() => {
                navigate(
                  `/dashboard/viviendas/habitantes/${vivienda.id_vivienda}`
                );
                //setUpdateID(vivienda.id_vivienda);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="¿Desea eliminar ésta vivienda?"
            onConfirm={async () => {
              try {
                await deleteVivienda(vivienda.id_vivienda);
                openNotificationSuccess("vivienda eliminada con exito!");
                getConsejoComunal();
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

  /*
  id_ubicacion
  id_consejo comunal
  id_tipo_vivienda
  id_tipo_techo_
  id_tipo_pared
  id_tipo_piso
  id_situacion_vivienda
  id_tipo_ocupacion_vivienda
   */
  const getConsejoComunal = async () => {
    try {
      const data = await getAllVivienda();
      // const mappedData = await Promise.all(
      //   data.map(async (item) => {
      //     const nombre_comuna = await getComunaByID(item.id_comuna);
      //     const nombre_ambito_territorial = await getAmbito(
      //       item.id_ambito_territorial
      //     );
      //     return {
      //       ...item,
      //       nombre_ambito_territorial:
      //         nombre_ambito_territorial.latitud +
      //         " x " +
      //         nombre_ambito_territorial.longitud,
      //       nombre_comuna: nombre_comuna.nombre,
      //     };
      //   })
      //  );
      setVivienda(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };

  useEffect(() => {
    getConsejoComunal();
  }, []);
  useEffect(() => {
    getConsejoComunal();
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
    <div>
      {contextHolder}
      <Content style={{ padding: "24px", background: "#fff" }}>
        <Table
          title={() => (
            <Flex vertical={false} justify="space-between" align="center">
              <h1>Listado de Viviendas</h1>
              <Button type="primary" onClick={showModal}>
                Añadir Vivienda
              </Button>
            </Flex>
          )}
          dataSource={vienda}
          columns={columns}
          pagination={{ pageSize: 5 }}
        />
        <ModalVivienda
          open={open}
          setOpen={setOpen}
          isUpdated={update}
          idVivienda={id_vivienda_update}
        />
      </Content>
    </div>
  );
};

export default viviendas;
