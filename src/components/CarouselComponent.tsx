import React from "react";
import { Carousel } from "antd";
import { Typography } from "antd";
import imageone from "../assets/carousel-img/32r.jpg";
import imagtwo from "../assets/carousel-img/cap223.jpg";

const { Title } = Typography;

const carouselStyle: React.CSSProperties = {
  height: "100vh",
  width: "100%",
  background: `url('${imageone}') center center / cover no-repeat`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
const carouselStyletwo: React.CSSProperties = {
  height: "100vh",
  width: "100%",
  background: `url('${imagtwo}') center center / cover no-repeat`,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};

const CarouselComponent: React.FC = () => {
  return (
    <Carousel
      autoplay
      style={{
        backgroundColor: "blue",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "blue",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={carouselStyle}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Blue with 50% transparency
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Title style={{ color: "#fff" }}>Bienvenido a COMUNAS</Title>
            <p
              style={{ maxWidth: "400px", textAlign: "center", color: "#fff" }}
            >
              Las comunas en Venezuela son organizaciones sociales que buscan
              promover la participación ciudadana y la autogestión en las
              comunidades. Estas entidades permiten a los ciudadanos trabajar
              juntos para resolver problemas locales, gestionar recursos y
              desarrollar proyectos que mejoren la calidad de vida en sus áreas.
              Las comunas son un ejemplo de democracia participativa y buscan
              fortalecer el tejido social y la solidaridad entre los habitantes.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div style={carouselStyletwo}>
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Blue with 50% transparency
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
              width: "100%",
              flexDirection: "column",
            }}
          >
            <Title style={{ color: "#fff" }}>Conéctate con tu comunidad</Title>
            <p
              style={{ maxWidth: "400px", textAlign: "center", color: "#fff" }}
            >
              Conectar con las comunidades a nivel gobernamental es crucial para
              fomentar la participación ciudadana y asegurar que las políticas
              públicas reflejen las necesidades y aspiraciones de la población.
              Esta conexión permite una mejor gestión de los recursos, promueve
              la transparencia y fortalece la confianza entre los ciudadanos y
              sus representantes. Además, facilita la identificación y solución
              de problemas locales, contribuyendo al desarrollo sostenible y al
              bienestar general de la sociedad.
            </p>
          </div>
        </div>
      </div>
    </Carousel>
  );
};

export default CarouselComponent;
