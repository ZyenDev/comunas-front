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
} from "antd";
import { JSX } from "react";
import { useNavigate } from "react-router";
import { UserOutlined } from "@ant-design/icons";
import image01 from "../assets/carousel-img/32r.jpg";
import image02 from "../assets/carousel-img/cap223.jpg";
import image03 from "../assets/carousel-img/espc4.jpg";

const { Header, Footer, Content } = Layout;

const { Meta } = Card;

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 64,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  justifyContent: "center",
};

const layoutStyle = {
  overflow: "hidden",
  width: "100%",
};

const footerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  backgroundColor: "#4096ff",
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
            <h1>CACIQUE JOSE MIGUEL GUANAGUANAY</h1>
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
          <Carousel
            arrows
            autoplay
            style={{ height: "700px", overflow: "hidden" }}
          >
            <div>
              <Image preview={false} width="100vw" src={image01} />
            </div>
            <div>
              <Image preview={false} width="100vw" src={image02} />
            </div>
          </Carousel>
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
            <h1>Nuestra historia right</h1>
            <Row gutter={16} justify="space-between">
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={image01} />}
                >
                  <Meta
                    title="Europe Street beat"
                    description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={image01} />}
                >
                  <Meta
                    title="Europe Street beat"
                    description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit."
                  />
                </Card>
              </Col>
              <Col span={8}>
                <Card
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={image01} />}
                >
                  <Meta
                    title="Europe Street beat"
                    description=" Lorem, ipsum dolor sit amet consectetur adipisicing elit."
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
              <h1>Historia General:</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam
                a et, in culpa, corporis rem quis, tempore tempora vero minus
                cumque sed? Optio placeat cumque quo veniam, eligendi dicta
                quas?
              </p>
            </div>
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
          </Flex>
        </Content>
        <Footer style={footerStyle}>Footer</Footer>
      </Layout>
    </Flex>
  );
}

export default Landing;
