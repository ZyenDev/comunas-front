import { useEffect, useState } from "react";
import {
  Button,
  Flex,
  Typography,
  Image,
  Form,
  notification,
  Col,
  Row,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  EyeInvisibleOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import Input from "antd/es/input/Input";
import { Link } from "react-router";
import logo from "../.. /assets/logo.webp";
import { useNavigate } from "react-router";
import { useAuth } from "../../components/AuthContext";
import { Register } from "../../controllers/SessionsController";

const { Title, Text } = Typography;
const registrar: React.FC = () => {
  const [role, setRole] = useState<string>();
  const [allow, canCreate] = useState<string>("Parlamentario");
  const [form] = Form.useForm();
  const [api, contextHolder] = notification.useNotification();
  const [loading, setLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState(true);
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setRole("admin");
  }, []);

  useEffect(() => {
    switch (role) {
      case "admin":
        canCreate("Parlamentario");
        break;
      case "Parlamentario":
        canCreate("Vocero");
        break;
      case "Vocero":
        canCreate("Habitante");
        break;

      default:
        canCreate("nothing");
        break;
    }
  }, [role]);

  const onFinish = (values: any) => {
    const registrar = async () => {
      try {
        setLoading(true);
        const data = await Register(values);
        api.success({
          message: "¡Registro exitoso!",
          description: "¡Su Usuario ha sido creado exitosamente!",
        });
        login(data.token);
        navigate("/dashboard/usuario");
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
          <Form
            form={form}
            name="sign_in"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Title>Crear {allow.toLowerCase()}</Title>
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
                      showPassword ? <EyeInvisibleOutlined /> : <EyeOutlined />
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
        </Col>
      </Row>
    </>
  );
};

export default registrar;
