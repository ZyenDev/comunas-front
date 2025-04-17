import { Col, Row } from "antd";
import CarouselCompo from "../components/CarouselComponent";

function SignIn() {
  return (
    <>
      <Row>
        <Col style={{ width: "50%", height: "100vh" }} sm={24} md={24}>
          <CarouselCompo />
        </Col>
      </Row>
    </>
  );
}

export default SignIn;
