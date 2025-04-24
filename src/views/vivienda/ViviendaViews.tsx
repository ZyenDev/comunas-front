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
import { getAllConsejoComunal } from "../../controllers/ConsejoComunalController";
import { ConsejoComunalInterface } from "../../models/ConsejoComunalModel";
import { TipoViviendaInterface } from "../../models/TipoViviendaModel";
import { getAllTipoVivienda } from "../../controllers/TipoViviendaController";
import { TipoTechoInterface } from "../../models/TipoTechoModel";
import { getAllTipoTecho } from "../../controllers/TipoTechoController";
import { TipoParedInteface } from "../../models/TipoParedModel";
import { getAllTipoPared } from "../../controllers/TipoParedController";
import { TipoPisoInterface } from "../../models/TipoPisoModel";
import { getAllTipoPiso } from "../../controllers/TipoPisoController";
import { SituacionViviendaInterface } from "../../models/SituacionVivienda";
import { getAllSituacionVivienda } from "../../controllers/SituacionViviendaController";
import { TipoOcupacionViviendaInterface } from "../../models/TipoOcupacionViviendaModel";
import { getAllTipoOcupacionViviendas } from "../../controllers/TipoOcupacionVivienda";
import { useAuth } from "../../components/AuthContext";

const { Content } = Layout;

const viviendas: React.FC = () => {
  const [vienda, setVivienda] = useState<ViviendaInterface[]>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const [id_vivienda_update, setUpdateID] = useState<number>();
  const [consejo, setConsejo] = useState<ConsejoComunalInterface[]>();
  const [tipovivienda, setTipoVivienda] = useState<TipoViviendaInterface[]>();
  const [tipoTecho, setTipoTecho] = useState<TipoTechoInterface[]>();
  const [tipoPared, setTipoPared] = useState<TipoParedInteface[]>();
  const [tipoPiso, setTipoPiso] = useState<TipoPisoInterface[]>();
  const [loading, setLoading] = useState(true);
  const [situacionVivienda, setSituacionVivienta] =
    useState<SituacionViviendaInterface[]>();
  const [TipoOcupacionVivienda, setOcupacionVivienda] =
    useState<TipoOcupacionViviendaInterface[]>();
  let navigate = useNavigate();
  const { token } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "id_vivienda",
      key: "id_vivienda",
      sorter: (a: any, b: any) => a.id_vivienda - b.id_vivienda,
    },
    {
      title: "Nro. Vivienda",
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
      render: (id_consejo_comunal: number) => {
        const consejoComunal = consejo?.find(
          (c) => c.id_consejo_comunal === id_consejo_comunal
        );
        return consejoComunal ? consejoComunal.nombre : "Desconocido.";
      },
    },
    {
      title: "Tipo de Vivienda",
      dataIndex: "id_tipo_vivienda",
      key: "id_tipo_vivienda",
      render: (id_tipo_vivienda: number) => {
        const tipoViv = tipovivienda?.find(
          (c) => c.id_tipo_vivienda === id_tipo_vivienda
        );
        return tipoViv ? tipoViv.descripcion : "Desconocido.";
      },
    },
    {
      title: "Tipo de Techo",
      dataIndex: "id_tipo_techo",
      key: "id_tipo_techo",
      render: (id_tipo_techo: number) => {
        const tipoTech = tipoTecho?.find(
          (c) => c.id_tipo_techo === id_tipo_techo
        );
        return tipoTech ? tipoTech.descripcion : "Desconocido.";
      },
    },
    {
      title: "Tipo de Pared",
      dataIndex: "id_tipo_pared",
      key: "id_tipo_pared",
      render: (id_tipo_pared: number) => {
        const tipoPad = tipoPared?.find(
          (c) => c.id_tipo_pared === id_tipo_pared
        );
        return tipoPad ? tipoPad.descripcion : "Desconocido.";
      },
    },
    {
      title: "Tipo de Piso",
      dataIndex: "id_tipo_piso",
      key: "id_tipo_piso",
      render: (id_tipo_piso: number) => {
        const tipoPis = tipoPiso?.find((c) => c.id_tipo_piso === id_tipo_piso);
        return tipoPis ? tipoPis.descripcion : "Desconocido.";
      },
    },
    {
      title: "Situación de Vivienda",
      dataIndex: "id_situacion_vivienda",
      key: "id_situacion_vivienda",
      render: (id_situacion_vivienda: number) => {
        const situaviv = situacionVivienda?.find(
          (c) => c.id_situacion_vivienda === id_situacion_vivienda
        );
        return situaviv ? situaviv.descripcion : "Desconocido.";
      },
    },
    {
      title: "Tipo de Ocupación de Vivienda",
      dataIndex: "id_tipo_ocupacion_vivienda",
      key: "id_tipo_ocupacion_vivienda",
      render: (id_tipo_ocupacion_vivienda: number) => {
        const tipoOcupa = TipoOcupacionVivienda?.find(
          (c) => c.id_tipo_ocupacion === id_tipo_ocupacion_vivienda
        );
        return tipoOcupa ? "tiene" : "Desconocido.";
      },
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
              }}
            />
          </Tooltip>
          <Popconfirm
            title="¿Desea eliminar ésta vivienda?"
            onConfirm={async () => {
              try {
                await deleteVivienda(vivienda.id_vivienda, token ? token : "");
                openNotificationSuccess("vivienda eliminada con exito!");
                getvivieda();
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

  const getvivieda = async () => {
    setLoading(true);
    try {
      const data = await getAllVivienda(token ? token : "");
      setVivienda(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getconsejos = async () => {
    try {
      const data = await getAllConsejoComunal(token ? token : "");
      setConsejo(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getTiposViviendas = async () => {
    try {
      const data = await getAllTipoVivienda(token ? token : "");
      setTipoVivienda(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getTiposTecho = async () => {
    try {
      const data = await getAllTipoTecho(token ? token : "");
      setTipoTecho(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getTipoPareds = async () => {
    try {
      const data = await getAllTipoPared(token ? token : "");
      setTipoPared(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getTipoPiso = async () => {
    try {
      const data = await getAllTipoPiso(token ? token : "");
      setTipoPiso(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getSituacionVivienda = async () => {
    try {
      const data = await getAllSituacionVivienda(token ? token : "");
      setSituacionVivienta(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };
  const getTipoOcupacionVivienda = async () => {
    try {
      const data = await getAllTipoOcupacionViviendas(token ? token : "");
      setOcupacionVivienda(data);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
    }
  };

  useEffect(() => {
    getvivieda();
    setLoading(false);
  }, []);
  useEffect(() => {
    getTipoOcupacionVivienda();
    getSituacionVivienda();
    getTipoPiso();
    getTipoPareds();
    getTiposTecho();
    getTiposViviendas();
    getconsejos();
    getvivieda();
    setLoading(false);
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
      <Content style={{ padding: "24px", width: "100%" }}>
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
          loading={loading}
          pagination={{ pageSize: 5 }}
          scroll={{ x: "max-content" }}
        />
        <ModalVivienda
          open={open}
          setOpen={setOpen}
          isUpdated={update}
          idVivienda={id_vivienda_update}
        />
      </Content>
    </>
  );
};

export default viviendas;
