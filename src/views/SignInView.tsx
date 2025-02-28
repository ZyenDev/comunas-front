import { Button, Flex, Typography, Carousel } from "antd";
import { UserOutlined, EyeOutlined } from "@ant-design/icons";
import Checkbox from "antd/es/checkbox/Checkbox";
import Input from "antd/es/input/Input";
import { useNavigate } from "react-router";
import React from "react";
import { Link } from "react-router";

const { Title, Paragraph, Text } = Typography;

const carouselStyle: React.CSSProperties = {
  height: "90vh",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  borderRadius: "16px",
  margin: "20px",
};

/*
TODO: 
crear cuenta 
recuperar cuenta

rutas
 */
//ESTO ES MAS COMO UN LOGIN
function SignIn() {
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
      <Flex
        gap="middle"
        vertical
        justify="center"
        align="center"
        style={{ width: "50%", height: "100vh" }}
      >
        <Title>COMUNAS</Title>
        <Flex vertical style={{ width: "80%" }} gap="small">
          <Flex gap="small">
            <Input placeholder="Primer Nombre" />
            <Input placeholder="Primer Apellido" />
          </Flex>
          <Input placeholder="Usuario" suffix={<UserOutlined />} />
          <Input.Password placeholder="Contraseña" />
        </Flex>
        <Flex
          vertical={false}
          gap="small"
          style={{ width: "80%" }}
          justify="center"
        >
          <Button style={{ width: "80%" }} type="primary">
            Crear Cuenta
          </Button>
        </Flex>
        <Text>
          ¿Ya tiene cuenta? <Link to="/login"> Iniciar sesión</Link>
        </Text>
      </Flex>
    </Flex>
  );
}

export default SignIn;
