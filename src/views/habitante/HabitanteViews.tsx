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

const { Content } = Layout;

const ConsejoComunalContent: React.FC<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isUpdated: boolean;
  id_consejo?: number;
}> = ({ open, setOpen, isUpdated, id_consejo }) => {
  const [form] = Form.useForm<ConsejoComunalInterface>();
  const [Ambito, setAmbito] = useState<DefaultOptionType[]>();
  const [Comuna, setComunas] = useState<DefaultOptionType[]>();
  const [api, contextHolder] = notification.useNotification();
  const [error, setError] = useState(false);

  const handleOk = () => {
    form.validateFields().then(async (values) => {
      try {
        if (!isUpdated) {
          const data = await createConsejoComunal(values);
        } else if (id_consejo != null) {
          const data = await updateConsejoComuna(id_consejo, values);
        } else {
          //este error en teoria es imposible
          throw new Error("fallo a optener un id");
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
      const getAmbitos = async () => {
        try {
          const data = await getAllAmbitos();
          let opt: DefaultOptionType[] = [];
          data.forEach((element) => {
            opt.push({
              value: element.id_ambito_territorial,
              label: "y " + element.latitud + " x" + element.longitud,
            });
          });
          setAmbito(opt);
        } catch (error) {
          console.error("Fallo al encontrar Ámbitos Territoriales:", error);
        }
      };
      const getComunas = async () => {
        try {
          const data = await getAllComunas();
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
        if (isUpdated && id_consejo != null && open) {
          try {
            const data = await getConsejoComunalById(id_consejo);
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
      getAmbitos();
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
              name="id_ambito_territorial"
              label="Ámbito Territorial"
              rules={[
                {
                  required: true,
                  message: "¡Por favor, selecciona el Ámbito Territorial!",
                },
              ]}
              validateStatus={error ? "error" : ""}
            >
              <Select options={Ambito} />
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
  const [api, contextHolder] = notification.useNotification();
  const [id_consejo_update, setUpdateID] = useState<number>();

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
                await deleteConsejoComunal(consejo.id_consejo_comunal);
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
      const data = await getAllConsejoComunal();
      const mappedData = await Promise.all(
        data.map(async (item) => {
          const nombre_comuna = await getComunaByID(item.id_comuna);
          const nombre_ambito_territorial = await getAmbito(
            item.id_ambito_territorial
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
      setConsejoComunal(mappedData);
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
              <h1>Listado de Habitantes</h1>
              <Button type="primary" onClick={showModal}>
                Añadir Habitante
              </Button>
            </Flex>
          )}
          dataSource={consejo}
          columns={columns}
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
