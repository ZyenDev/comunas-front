import { Button, Flex, Typography, Carousel, Form, FormProps } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Input from "antd/es/input/Input";
import React from "react";
import { Link } from "react-router";

const { Title, Text } = Typography;

const carouselStyle: React.CSSProperties = {
  height: "90vh",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "16px",
  margin: "20px",
};

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
  console.log("Success:", values);
};

const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (errorInfo) => {
  console.log("Failed:", errorInfo);
};

/*
TODO: 
crear cuenta 
recuperar cuenta

rutas
 */
//ESTO ES MAS COMO UN LOGIN
function Login() {
  return (
    <Flex vertical={false}>
      <Flex
        style={{ width: "50%", height: "100vh" }}
        vertical={true}
        justify="center"
      >
        <Carousel dotPosition="bottom" autoplay style={carouselStyle}>
          <div>
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
        </Carousel>
      </Flex>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        name="login"
        style={{
          gap: "8px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          width: "50%",
          height: "100vh",
        }}
      >
        <Title>COMUNAS</Title>
        <Flex vertical style={{ width: "80%" }} gap="small">
          <Form.Item<FieldType>
            name="username"
            rules={[
              { required: true, message: "Por favor, ingresa tu Usuario!" },
            ]}
          >
            <Input placeholder="Ingresar Usuario" suffix={<UserOutlined />} />
          </Form.Item>
          <Form.Item<FieldType>
            name="password"
            rules={[
              { required: true, message: "Por favor, ingresa tu Usuario!" },
            ]}
          >
            <Input.Password placeholder="Ingresar Contraseña" />
          </Form.Item>
        </Flex>
        <Flex
          vertical={false}
          gap="small"
          style={{ width: "80%" }}
          justify="center"
        >
          <Form.Item style={{ width: "80%" }}>
            <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
              Ingresar
            </Button>
          </Form.Item>
        </Flex>
        <Text>
          ¿Desea crear una cuenta?
          <Link to="/signin"> ¡Crea una!</Link>
        </Text>
      </Form>
    </Flex>
  );
}

export default Login;
