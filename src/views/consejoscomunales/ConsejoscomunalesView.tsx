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
  createAmbito,
  getAmbito,
  updateAmbito,
} from "../../controllers/AmbitoTerritorialController";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import { DefaultOptionType } from "antd/es/select";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import { LatLngTuple } from "leaflet";
import { useAuth } from "../../components/AuthContext";

const { Content } = Layout;

const ConsejoComunalContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  id_consejo?: number;
}> = ({ open, setOpen, isUpdated, id_consejo }) => {
  const [form] = Form.useForm<ConsejoComunalInterface>();
  const [Comuna, setComunas] = useState<DefaultOptionType[]>();
  const [loading, setLoading] = useState(false);

  const [api, contextHolder] = notification.useNotification();
  const { token } = useAuth();
  const [error, setError] = useState(false);
  const [markerPosition, setMarkerPosition] = useState<LatLngTuple | null>(
    null
  );

  // Component to handle map click events
  const MapClickHandler: React.FC = () => {
    useMapEvent("click", (e) => {
      setMarkerPosition([e.latlng.lat, e.latlng.lng]);
    });
    return null; // This component doesn't render anything
  };

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (!markerPosition) {
          openNotificationError(
            "¡Por favor, seleccione una posición en el mapa!"
          );
          throw new Error("¡Por favor, seleccione una posición en el mapa!");
        }
        const formattedLat = parseFloat(markerPosition[0].toFixed(6));
        const formattedLng = parseFloat(markerPosition[1].toFixed(6));
        if (!isUpdated) {
          const ambito = await createAmbito(
            {
              id_ambito_territorial: 0, // Assuming the backend will generate this ID
              latitud: formattedLat,
              longitud: formattedLng,
            },
            token ? token : ""
          );
          values.id_ambito_territorial = ambito.id_ambito_territorial;
          await createConsejoComunal(values, token ? token : "");
        } else if (id_consejo != null) {
          const comuna = await getComunaByID(id_consejo, token ? token : "");
          const ambito = await updateAmbito(
            comuna.id_ambito_territorial,
            {
              id_ambito_territorial: comuna.id_ambito_territorial, // Assuming the backend will generate this ID
              latitud: formattedLat,
              longitud: formattedLng,
            },
            token ? token : ""
          );

          values.id_ambito_territorial = ambito.id_ambito_territorial;
          await updateConsejoComuna(id_consejo, values, token ? token : "");
        } else {
          //este error en teoria es imposible
          throw new Error("¡Fallo al obtener ID!");
        }
        form.resetFields();
        setOpen(false);
        setError(false);
      } catch (error: any) {
        let responceArray = error?.response.data;
        for (const key in responceArray) {
          if (responceArray.hasOwnProperty(key)) {
            openNotificationError(responceArray[key][0]);
            setError(true);
          }
        }
      }
    });
  };
  const handleCancel = () => {
    form.resetFields();
    setOpen(false);
  };

  useEffect(() => {
    if (open) {
      const getComunas = async () => {
        setLoading(true);
        try {
          const data = await getAllComunas(token ? token : "");
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_comuna,
              label: element.nombre,
            });
          });
          setComunas(opt);
        } catch (error) {
          console.error("Fallo al encontrar Comunas:", error);
        }
      };
      const getConsejoComunalbyid = async () => {
        setLoading(true);
        if (isUpdated && id_consejo != null && open) {
          try {
            const data = await getConsejoComunalById(
              id_consejo,
              token ? token : ""
            );
            form.setFieldsValue(data);
          } catch (error) {
            console.log(error);
          }
        } else {
          form.resetFields();
        }
      };
      getConsejoComunalbyid();
      getComunas();
      // getAmbitos();
      setLoading(false);
      setError(false);
    }
  }, [open]);

  const openNotificationError = (msg: string) => {
    api.error({
      message: msg,
    });
  };

  const customFooter = [
    <Button key="back" onClick={handleCancel}>
      Cancelar
    </Button>,
    <Button key="submit" type="primary" onClick={handleOk}>
      Entregar
    </Button>,
  ];

  return (
    <>
      <Flex vertical>
        {contextHolder}
        <Divider />
        <Modal
          title="Consejo Comunal: "
          open={open}
          onCancel={handleCancel}
          footer={customFooter}
          loading={loading}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ cantidad_consejo_comunal: 1 }}
          >
            <Form.Item
              name="nombre"
              label="Nombre"
              rules={[
                { required: true, message: "¡Por favor, ingrese el Nombre!" },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="codigo_situr"
              label="Código Situr"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, ingrese el Código Situr!",
                },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="rif"
              label="RIF"
              rules={[
                { required: true, message: "¡Por favor, ingresa el RIF!" },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <Input />
            </Form.Item>
            <Form.Item
              style={{ width: "100%" }}
              name="longitud"
              label="Ambito territorial"
              validateStatus={error ? "error" : ""}
            >
              <div
                style={{
                  height: "400px",
                  width: "100%",
                  backgroundColor: "black",
                }}
              >
                <MapContainer
                  center={[9.74619, -63.18598]}
                  zoom={14}
                  style={{ height: "100%", width: "100%" }}
                >
                  <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  />
                  {markerPosition && (
                    <Marker position={markerPosition}>
                      <Popup>
                        Marker at <br />
                        Lat: {markerPosition[0].toFixed(4)}, Lng:{" "}
                        {markerPosition[1].toFixed(4)}
                      </Popup>
                    </Marker>
                  )}

                  {/* Add the MapClickHandler component to handle map clicks */}
                  <MapClickHandler />
                </MapContainer>
              </div>
            </Form.Item>
            <Form.Item
              name="id_comuna"
              label="COMUNA"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, selecciona el Ámbito Territorial!",
                },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <Select options={Comuna} />
            </Form.Item>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

const ConsejoComunal: React.FC = () => {
  const [consejo, setConsejoComunal] = useState<ConsejoComunalInterface[]>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);
  const [api, contextHolder] = notification.useNotification();
  const [id_consejo_update, setUpdateID] = useState<number>();
  const { token } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "id_consejo_comunal",
      key: "id_consejo_comunal",
      sorter: (a: ConsejoComunalInterface, b: ConsejoComunalInterface) =>
        b.id_comuna - a.id_comuna,
    },
    {
      title: "Nombre",
      dataIndex: "nombre",
      key: "nombre",
    },
    {
      title: "Código Situr",
      dataIndex: "codigo_situr",
      key: "codigo_situr",
    },
    {
      title: "RIF",
      dataIndex: "rif",
      key: "rif",
    },
    {
      title: "Ámbito Territorial",
      dataIndex: "nombre_ambito_territorial",
      key: "id_ambito_territorial",
    },
    {
      title: "Comuna",
      dataIndex: "nombre_comuna",
      key: "id_comuna",
    },
    {
      title: "Acción",
      key: "action",
      render: (consejo: ConsejoComunalInterface) => (
        <Flex vertical={false} gap="8px">
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            onClick={() => {
              setUpdate(true);
              setOpen(true);
              setUpdateID(consejo.id_consejo_comunal);
            }}
          />
          <Popconfirm
            title="¿Desea eliminar éste Consejo Comunal?"
            onConfirm={async () => {
              try {
                await deleteConsejoComunal(
                  consejo.id_consejo_comunal,
                  token ? token : ""
                );
                openNotificationSuccess("¡Comuna eliminada con exito!");
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

  const getConsejoComunal = async () => {
    try {
      const data = await getAllConsejoComunal(token ? token : "");
      const mappedData = await Promise.all(
        data.map(async (item) => {
          const nombre_comuna = await getComunaByID(
            item.id_comuna,
            token ? token : ""
          );
          const nombre_ambito_territorial = await getAmbito(
            item.id_ambito_territorial,
            token ? token : ""
          );
          return {
            ...item,
            nombre_ambito_territorial:
              nombre_ambito_territorial.latitud +
              " x " +
              nombre_ambito_territorial.longitud,
            nombre_comuna: nombre_comuna.nombre,
          };
        })
      );
      setLoading(false);
      setConsejoComunal(mappedData);
    } catch (error: any) {
      openNotificationError(error?.message || "Error desconocido.");
      setLoading(false);
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
      <Content style={{ padding: "24px" }}>
        <Table
          title={() => (
            <Flex
              vertical={false}
              justify="space-between"
              align="center"
              style={{ flexWrap: "wrap" }}
            >
              <h1>Listado de Consejos Comunales</h1>
              <Button type="primary" onClick={showModal}>
                Añadir Consejo Comunal
              </Button>
            </Flex>
          )}
          dataSource={consejo}
          columns={columns}
          loading={loading}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 5 }}
        />
        <ConsejoComunalContent
          open={open}
          setOpen={setOpen}
          isUpdated={update}
          id_consejo={id_consejo_update}
        />
      </Content>
    </div>
  );
};

export default ConsejoComunal;
