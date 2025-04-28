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
  Switch,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import { useAuth } from "../../components/AuthContext";
import {
  Register,
  getUserByRole,
  toggleUser,
} from "../../controllers/SessionsController";

const { Title } = Typography;
const Registrar: React.FC = () => {
  //const [role, setRole] = useState<string>();
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [datasource, setDataSource] = useState<any>();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(true);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const { login, role, token } = useAuth();
  const [allow, canCreate] = useState<string>("");

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
      dataIndex: "is_active",
      key: "is_active",
      render: (_: any, record: any) => (
        <Switch
          defaultChecked={record.is_active}
          onChange={(checked) => {
            const disableUser = async () => {
              try {
                await toggleUser(record.id, checked, token ? token : "");
                notification.success({
                  message: "Estado actualizado",
                  description: `El usuario ha sido ${
                    checked ? "activado" : "desactivado"
                  } exitosamente.`,
                });
                fetchUsers(); // Refresh the user list
              } catch (error) {
                console.error("Error toggling user:", error);
                notification.error({
                  message: "Error al actualizar",
                  description:
                    "Hubo un problema al cambiar el estado del usuario.",
                });
              }
            };

            disableUser();
          }}
        />
      ),
    },
  ];

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const users = await getUserByRole(role, token ? token : "");
      const formattedData = users.map((user: any, index: number) => ({
        key: index,
        id: user.id,
        usuario: user.username,
        email: user.email,
        is_active: user.is_active,
      }));
      setDataSource(formattedData);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching users:", error);
    }
    setLoading(false);
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
          role ? role : "",
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
      {contextHolder}
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
            loading={loading}
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
            style={{ marginBottom: "16px", flexWrap: "wrap" }}
          >
            {allow === "Habitante" ? (
              <Title level={4}>Listado de Habitantes con Usuario</Title>
            ) : (
              <Title level={4}>Registrar {allow}</Title>
            )}

            {allow !== "Habitante" && (
              <Button type="primary" onClick={() => setModalVisible(true)}>
                Crear {allow ? allow?.toLowerCase() : ""}
              </Button>
            )}
          </Flex>
          <Table
            dataSource={datasource}
            columns={columns}
            loading={loading}
            scroll={{ x: "max-content" }}
          />
        </Col>
      </Row>
    </>
  );
};

export default Registrar;

/*
path('api/groups/<str:group_name>/users/', views.get_users_by_group)
 */
