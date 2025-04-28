import {
  Button,
  Flex,
  Layout,
  Row,
  Col,
  Card,
  Image,
  Divider,
  Typography,
} from "antd";
import { JSX } from "react";
import { useNavigate } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import logocomuna from "../assets/logo.webp";
import image02 from "../assets/carousel-img/cap223.jpg";
import image03 from "../assets/carousel-img/espc4.jpg";
import cardimg01 from "../assets/card-img/espc1.png";
import cardimg02 from "../assets/card-img/espc2.png";
import cardimg03 from "../assets/card-img/espc3.jpg";
import cajasimg from "../assets/cajas.jpg";

const { Header, Footer, Content } = Layout;
const { Title, Paragraph } = Typography;
const { Meta } = Card;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#ad1a14",
  justifyContent: "center",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#ad1a14",
};

function Landing(): JSX.Element {
  let navigate = useNavigate();

  return (
    <Flex vertical>
      <Layout style={layoutStyle}>
        <Header style={headerStyle}>
          <Flex
            vertical={false}
            justify="space-between"
            align="center"
            style={{ height: "64px" }}
          >
            <Image preview={false} width="45px" src={logocomuna} />
            <h1>GUANAGUANAY</h1>
            <Button
              type="primary"
              shape="default"
              icon={<UserOutlined />}
              size="large"
              onClick={() => {
                navigate("/login");
              }}
            >
              Iniciar sesión
            </Button>
          </Flex>
        </Header>
        <Content>
          {/* Imagen fija (image01) */}
          <div
            style={{
              position: "relative",
              height: "50vh", // Adjust height to be responsive
              overflow: "hidden",
            }}
          >
            {/* Capa oscura encima de la imagen */}
            <div
              style={{
                position: "absolute",
                width: "100%",
                height: "100%",
                backgroundColor: "rgba(0, 0, 0, 0.5)", // Capa oscura
                zIndex: 1,
              }}
            ></div>

            <Image
              preview={false}
              width="100%"
              src={image02}
              style={{
                height: "100%", // Ensure the image covers the container
                objectFit: "cover", // Maintain aspect ratio and cover the area
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Sombra correctamente aplicada
              }}
            />

            {/* Contenido de texto centrado */}
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                color: "#fff",
                padding: "20px",
                borderRadius: "10px",
                zIndex: 2, // Asegura que el texto quede encima de la capa oscura
                textAlign: "center", // Center text for smaller screens
                width: "90%", // Adjust width for responsiveness
                maxWidth: "500px", // Limit maximum width
              }}
            >
              <Title
                level={2}
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "clamp(1.5rem, 4vw, 2rem)", // Responsive font size
                }}
              >
                Bienvenido a Guanaguanay
              </Title>
              <Paragraph
                style={{
                  color: "#fff",
                  margin: 0,
                  fontSize: "clamp(1rem, 3vw, 1.25rem)", // Responsive font size
                }}
              >
                Descubre nuestra comunidad y participa en su desarrollo.
              </Paragraph>
              {/* <Button
                type="primary"
                size="large"
                ghost
                style={{
                  color: "#fff", // Texto en blanco
                  marginTop: "15px", // Espaciado debajo del texto
                }}
                onClick={() => {
                  navigate("/historia");
                }}
              >
                Historia
              </Button> */}
            </div>
          </div>

          <Divider />

          <Flex
            align="center"
            gap="small"
            style={{
              width: "100%",
              padding: "45px",
              flexWrap: "wrap", // Allow wrapping if content is too big
            }}
          >
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={24} md={8}>
                <Image
                  preview={false}
                  src={image03}
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: "20px",
                    flexShrink: 0, // Prevent image from shrinking
                  }}
                />
              </Col>
              <Col xs={24} sm={24} md={16}>
                <div style={{ flex: 1, width: "100%" }}>
                  <h1>Comuna Jose Miguel Guanaguanay:</h1>
                  <p>
                    La comuna Cacique Guanaguanay, la cual cuenta con una
                    cantidad de habitantes aproximada de 8.208, representa un
                    centro de funcionabilidades diversas para el sector los
                    "Godos" que sin lugar a dudas implica la responsabilidad de
                    cubrir internamente variados departamentos y a su vez es
                    encargada de gestionar las actividades de distintos consejos
                    comunales con el objetivo de un desarrollo social eficiente
                    y un sistema ciudadano participativo y lleno de respeto.
                  </p>
                </div>
              </Col>
            </Row>
          </Flex>

          <Divider />

          <Flex align="center" vertical style={{ padding: "25px" }}>
            <h1>Nuestra comunidad</h1>
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={<img alt="example" src={cardimg01} />}
                >
                  <Meta
                    title="Mision y vision"
                    description=" Los lideres comunales: caracteristicas, objetivos y desempeño social."
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={<img alt="example" src={cardimg02} />}
                >
                  <Meta
                    title="Historia"
                    description=" Nuestra historia y acontecimientos mas relevantes."
                  />
                </Card>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  style={{ width: "100%" }}
                  cover={<img alt="example" src={cardimg03} />}
                >
                  <Meta
                    title="Consejo comunal"
                    description=" Los lideres comunales: caracteristicas, objetivos y desempeño social."
                  />
                </Card>
              </Col>
            </Row>
          </Flex>

          <Divider />

          <Flex
            align="center"
            gap="small"
            style={{
              width: "100%",
              padding: "45px",
              flexWrap: "wrap", // Allow wrapping if content is too big
            }}
          >
            <Row gutter={[16, 16]} justify="center">
              <Col xs={24} sm={24} md={16}>
                <div style={{ flex: 1, width: "100%" }}>
                  <h1>Objetivos de los consejos comunales:</h1>
                  <p>
                    Los consejos comunales son organizaciones de base popular en
                    Venezuela que tienen como objetivo la participación
                    ciudadana en la gestión de políticas públicas y el
                    desarrollo comunitario. la importancia de los Consejos
                    Comunales está dirigida a buscar soluciones y a ejecutar
                    acciones tendentes a mejorar las situaciones que afecten a
                    las comunidades, entendiendo éstas como el ámbito operativo
                    más adecuado para detectar las necesidades y problemas que
                    se manifiesten.
                  </p>
                </div>
              </Col>
              <Col xs={24} sm={12} md={8}>
                <Image
                  preview={false}
                  src={cajasimg}
                  style={{
                    overflow: "hidden",
                    width: "100%",
                    borderRadius: "20px",
                    flexShrink: 0, // Prevent image from shrinking
                  }}
                />
              </Col>
            </Row>
          </Flex>

          <Divider />

          <Flex
            align="center"
            gap="small"
            style={{ width: "100vw", height: "300px", padding: "20px" }}
          >
            {/* Mapa de Google Maps */}
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3932.44733983676!2d-63.20357762589083!3d9.728121577655832!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8c33475f3ab547b7%3A0xb4028927879acce7!2sAv.%20Principal%20de%20Los%20Godos!5e0!3m2!1ses!2sve!4v1707193193663!5m2!1ses!2sve"
              width="30%"
              height="250px"
              style={{ borderRadius: "10px", border: "none" }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div>
              <p>
                Actualmente la comuna "Cacique Jose Miguel Guanaguanay" se
                encuentra ubicada en el sector Los Godos, detrás del Estadio Los
                Comunales lateral a la escuela Manola Luna Silva.
              </p>
            </div>
          </Flex>
        </Content>

        <Divider />

        <Footer style={footerStyle}>
          Desarrollado por Universidad Bolivariana de Venezuela. Maturín, Estado
          Monagas.
        </Footer>
      </Layout>
    </Flex>
  );
}

export default Landing;
