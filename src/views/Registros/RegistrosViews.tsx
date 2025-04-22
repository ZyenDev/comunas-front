import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Typography,
  Form,
  notification,
  Col,
  Row,
  Table,
  Modal,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router";
import { useAuth } from "../../components/AuthContext";
import { Register, getUserByRole } from "../../controllers/SessionsController";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "usuario",
    dataIndex: "usuario",
    key: "usuario",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "desactivar",
    dataIndex: "desactivar",
    key: "desactivar",
    render: (habitante: any) => (
      <Flex vertical={false} gap="8px">
        <Button
          type="primary"
          icon={<EditOutlined />}
          size="middle"
          onClick={() => {
            // setUpdate(true);
            // setOpen(true);
            // setUpdateID(habitante.id_habitante);
          }}
        />
      </Flex>
    ),
  },
];

const dataSource = [
  {
    id: "1",
    usuario: "johndoe",
    email: "johndoe@example.com",
  },
  {
    id: "2",
    usuario: "janedoe",
    email: "janedoe@example.com",
  },
  {
    id: "3",
    usuario: "adminuser",
    email: "admin@example.com",
  },
];

const { Title } = Typography;
const registrar: React.FC = () => {
  //const [role, setRole] = useState<string>();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [datasource, setDataSource] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { login, role, token } = useAuth();
  const [allow, canCreate] = useState<string>("");

  const fetchUsers = async () => {
    try {
      const users = await getUserByRole(role, token ? token : "");
      const formattedData = users.map((user: any, index: number) => ({
        key: index,
        id: user.id,
        usuario: user.username,
        email: user.email,
      }));
      setDataSource(formattedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
  };

  useEffect(() => {
    setLoading(true);

    switch (role) {
      case "Administrador":
        canCreate("Parlamentario");
        break;
      case "Parlamentario":
        canCreate("Vocero");
        break;
      case "Vocero":
        canCreate("Habitante");
        break;
      default:
        canCreate("N/A");
        break;
    }

    if (role) {
      fetchUsers();
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [modalVisible]);

  const onFinish = (values: any) => {
    const registrar = async () => {
      try {
        setLoading(true);
        const data = await Register(
          values,
          allow ? allow?.toLowerCase() : "",
          token ? token : ""
        );
        api.success({
          message: "¡Registro exitoso!",
          description: "¡Su Usuario ha sido creado exitosamente!",
        });
        login(data.token, data.email.username, data.group);
        form.resetFields();
      } catch (error) {
        setLoading(false);
        api.error({
          message: "Error en el registro.",
          description:
            "¡Hubo un problema al crear su Usuario. Por favor, intente nuevamente!",
        });
      }
    };
    registrar();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <>
      <Row>
        <Col
          sm={12}
          md={24}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Modal
            title={`Crear ${allow ? allow?.toLowerCase() : ""}`}
            visible={modalVisible}
            onCancel={() => setModalVisible(false)}
            footer={null}
          >
            <Form
              form={form}
              name="sign_in"
              onFinish={(values) => {
                onFinish(values);
                setModalVisible(false);
              }}
              onFinishFailed={onFinishFailed}
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Flex vertical style={{ width: "80%" }}>
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese su Usuario!",
                    },
                  ]}
                >
                  <Input placeholder="Usuario" suffix={<UserOutlined />} />
                </Form.Item>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese su Correo Electrónico!",
                    },
                  ]}
                >
                  <Input
                    placeholder="Correo Electrónico"
                    suffix={<MailOutlined />}
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "¡Por favor, ingrese su Contraseña!",
                    },
                  ]}
                >
                  <div style={{ position: "relative" }}>
                    <Input
                      type={showPassword ? "password" : "text"}
                      placeholder="Ingresa tu Contraseña"
                    />
                    <Button
                      type="text"
                      onClick={() => setShowPassword((prev) => !prev)}
                      style={{
                        position: "absolute",
                        right: 10,
                        top: "50%",
                        transform: "translateY(-50%)",
                      }}
                      icon={
                        showPassword ? (
                          <EyeInvisibleOutlined />
                        ) : (
                          <EyeOutlined />
                        )
                      }
                    />
                  </div>
                </Form.Item>
                <Form.Item>
                  <Button
                    loading={loading}
                    type="primary"
                    htmlType="submit"
                    style={{ width: "100%" }}
                  >
                    Crear Usuario
                  </Button>
                </Form.Item>
              </Flex>
            </Form>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Flex
            justify="space-between"
            align="center"
            style={{ marginBottom: "16px" }}
          >
            <Title level={4}>Registrar {allow}</Title>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Crear {allow ? allow?.toLowerCase() : ""}
            </Button>
          </Flex>
          <Table dataSource={datasource} columns={columns} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default registrar;

/*
path('api/groups/<str:group_name>/users/', views.get_users_by_group)
 */
