import React, { useEffect, useState } from "react";
import {
  Table,
  Layout,
  Flex,
  Button,
  Divider,
  Form,
  Modal,
  Input,
  Popconfirm,
  InputNumber,
  notification,
} from "antd";
import {
  getAllComunas,
  deleteComuna,
  createComuna,
  updateComuna,
  getComunaByID,
} from "../../controllers/ComunaController";
import { ComunaInterface } from "../../models/ComunaModel";
import {
  createAmbito,
  getAmbito,
  updateAmbito,
} from "../../controllers/AmbitoTerritorialController";
import { DeleteFilled, EditOutlined } from "@ant-design/icons";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvent,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import { useAuth } from "../../components/AuthContext";

const { Content } = Layout;

const ComunasHeadContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdate: boolean;
  idComuna?: number;
}> = ({ open, setOpen, isUpdate, idComuna }) => {
  const [form] = Form.useForm<ComunaInterface>();
  // const [Ambito, setAmbito] = useState<DefaultOptionType[]>();
  const [api, contextHolder] = notification.useNotification();

  const [error, setError] = useState(false);
  const { token } = useAuth();
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
        if (!isUpdate) {
          const ambito = await createAmbito(
            {
              id_ambito_territorial: 0, // Assuming the backend will generate this ID
              latitud: formattedLat,
              longitud: formattedLng,
            },
            token ? token : ""
          );

          values.id_ambito_territorial = ambito.id_ambito_territorial;

          await createComuna(values, token ? token : "");
        } else if (idComuna != null) {
          const comuna = await getComunaByID(idComuna, token ? token : "");
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
          await updateComuna(idComuna, values, token ? token : "");
        } else {
          throw new Error("¡Fallo al obtener ID!");
        }
        setOpen(false);
        setError(false);
        form.resetFields();
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
      // const getAmbitos = async () => {
      //   try {
      //     const data = await getAllAmbitos(token ? token : "");
      //     let opt: DefaultOptionType[] = [];
      //     data.forEach((element) => {
      //       opt.push({
      //         value: element.id_ambito_territorial,
      //         label: "Y " + element.latitud + " X" + element.longitud,
      //       });
      //     });
      //     setAmbito(opt);
      //   } catch (error) {
      //     console.error("Fallo al encontrar Ámbitos Territoriales:", error);
      //   }
      // };
      const getComunalByid = async () => {
        if (isUpdate && idComuna != null && open) {
          try {
            const data = await getComunaByID(idComuna, token ? token : "");
            form.setFieldsValue(data);
          } catch (error) {
            console.log(error);
          }
        } else {
          form.resetFields();
        }
      };
      getComunalByid();
      setError(false);
      // getAmbitos();
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
      Registrar
    </Button>,
  ];

  return (
    <>
      <Flex vertical>
        {contextHolder}
        <Divider />
        <Modal
          title="Listado de Comunas"
          open={open}
          onCancel={handleCancel}
          footer={customFooter}
        >
          <Form
            form={form}
            layout="vertical"
            name="form_in_modal"
            initialValues={{ cantidad_consejo_comunal: 1 }}
            style={{ width: "100%" }}
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
              label="Codigo Situr"
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
                { required: true, message: "¡Por favor, ingrese el RIF!" },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="cantidad_consejo_comunal"
              label="Personal del Consejo Comunal"
              rules={[
                {
                  required: true,
                  message:
                    "¡Por favor, ingrese la cantidad de Personal del Consejo Comunal!",
                },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <InputNumber
                min={1}
                max={512}
                defaultValue={1}
                formatter={(value) => `${value}`}
              />
            </Form.Item>
            <Flex gap="small" style={{ width: "100%" }}>
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
                          Puntero en <br />
                          Lat: {markerPosition[0].toFixed(4)}, Lng:{" "}
                          {markerPosition[1].toFixed(4)}
                        </Popup>
                      </Marker>
                    )}

                    <MapClickHandler />
                  </MapContainer>
                </div>
              </Form.Item>
            </Flex>
          </Form>
        </Modal>
      </Flex>
    </>
  );
};

const ComunaViews: React.FC = () => {
  const [comunas, setComunas] = useState<ComunaInterface[]>();
  const [open, setOpen] = useState(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [api, contextHolder] = notification.useNotification();
  const [idComuna, setUpdateID] = useState<number>();
  const [loading, setLoading] = useState(true);
  const { token } = useAuth();

  const columns = [
    {
      title: "ID",
      dataIndex: "id_comuna",
      key: "id_comuna",
      sorter: (a: ComunaInterface, b: ComunaInterface) =>
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
      title: "Personal del Consejo Comunal",
      dataIndex: "cantidad_consejo_comunal",
      key: "cantidad_consejo_comunal",
    },
    {
      title: "Acción",
      key: "action",
      render: (comuna: ComunaInterface) => (
        <Flex vertical={false} gap={"8px"}>
          <Button
            type="primary"
            icon={<EditOutlined />}
            size="middle"
            onClick={() => {
              setUpdate(true);
              setOpen(true);
              setUpdateID(comuna.id_comuna);
            }}
          />
          <Popconfirm
            title="¿Deseas eliminar ésta Comuna?"
            onConfirm={async () => {
              try {
                await deleteComuna(comuna.id_comuna, token ? token : "");
                openNotificationSuccess("¡Comuna eliminada con éxito!");
                getComunas();
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

  const getComunas = async () => {
    try {
      const data = await getAllComunas(token ? token : "");
      const mappedData = await Promise.all(
        data.map(async (item) => {
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
          };
        })
      );
      setComunas(mappedData);
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      openNotificationError(error?.message || "Error desconocido.");
    }
  };

  useEffect(() => {
    getComunas();
  }, []);
  useEffect(() => {
    getComunas();
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
              <h1>Listado de Comunas</h1>
              <Button type="primary" onClick={showModal}>
                Añadir Comuna
              </Button>
            </Flex>
          )}
          dataSource={comunas}
          columns={columns}
          loading={loading}
          scroll={{ x: "max-content" }}
          pagination={{ pageSize: 5 }}
        />
        <ComunasHeadContent
          open={open}
          setOpen={setOpen}
          isUpdate={update}
          idComuna={idComuna}
        />
      </Content>
    </div>
  );
};

export default ComunaViews;
