import {
  Button,
  Carousel,
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
import logocomuna from "../assets/logo.png";
import image01 from "../assets/carousel-img/32r.jpg";
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
  backgroundColor: "#5c0011",
  justifyContent: "center",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#5c0011",
};

const CcontentStyle: React.CSSProperties = {
  margin: 0,
  height: "660px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79",
  backgroundImage:
    "url(https://cdn.pixabay.com/photo/2020/10/22/16/14/building-5676506_960_720.jpg)",
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
              shape="round"
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
              height: "700px",
              overflow: "hidden",
            }}
          >
            <Image // -------------------------- Chandro has la puta imagen oscurita por favor >:3
              preview={false}
              width="100%"
              src={image02}
              style={{
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Sombra correctamente aplicada
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "50%",
                left: "20%",
                transform: "translate(-50%, -50%)",
                // textAlign: "center",
                color: "#fff",
                padding: "20px",
                borderRadius: "10px",
              }}
            >
              <Title level={2} style={{ color: "#fff", margin: 0 }}>
                Bienvenido a Guanaguanay
              </Title>
              <Paragraph style={{ color: "#fff", margin: 0 }}>
                Descubre nuestra comunidad y participa en su desarrollo.
              </Paragraph>
            </div>
          </div>

          <Divider />

          <Flex
            align="center"
            gap="small"
            style={{ width: "100vw", height: "300px", padding: "20px" }}
          >
            <Image
              preview={false}
              src={image03}
              style={{
                overflow: "hidden",
                width: "350px",
                height: "250px",
                borderRadius: "20px",
              }}
            />
            <div>
              <h1>Comuna Jose Miguel Guanaguanay:</h1>
              <p>
                La comuna Cacique Guanaguanay, la cual cuenta con una cantidad
                de habitantes aproximada de 8.208, representa un centro de
                funcionabilidades diversas para el sector los "Godos" que sin
                lugar a dudas implica la responsabilidad de cubrir internamente
                variados departamentos y a su vez es encargada de gestionar las
                actividades de distintos consejos comunales con el objetivo de
                un desarrollo social eficiente y un sistema ciudadano
                participativo y lleno de respeto.
              </p>
            </div>
          </Flex>

          <Divider />

          <Flex align="center" vertical style={{ padding: "20px" }}>
            <h1>Nuestra comunidad</h1>
            <Row gutter={16} justify="space-between">
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={cardimg01} />}
                >
                  <Meta
                    title="Mision y vision"
                    description=" Los lideres comunales: caracteristicas, objetivos y desempeño social."
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={cardimg02} />}
                >
                  <Meta
                    title="Historia"
                    description=" Nuestra historia y acontecimientos mas relevantes."
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
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
            style={{ width: "100vw", height: "300px", padding: "20px" }}
          >
            <div>
              <h1>Objetivos de los consejos comunales:</h1>
              <p>
                Los consejos comunales son organizaciones de base popular en
                Venezuela que tienen como objetivo la participación ciudadana en
                la gestión de políticas públicas y el desarrollo comunitario. la
                importancia de los Consejos Comunales está dirigida a buscar
                soluciones y a ejecutar acciones tendentes a mejorar las
                situaciones que afecten a las comunidades, entendiendo éstas
                como el ámbito operativo más adecuado para detectar las
                necesidades y problemas que se manifiesten.
              </p>
            </div>
            <Image
              preview={false}
              src={cajasimg}
              style={{
                overflow: "hidden",
                width: "350px",
                height: "250px",
                borderRadius: "20px",
              }}
            />
          </Flex>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Flex>
  );
}

export default Landing;
