import React from "react";
import { Button } from "antd";
import { useNavigate } from "react-router";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "20%" }}>
      <h1>404</h1>
      <p>Lo siento, la página que visitaste no existe.</p>
      <Button type="primary" onClick={() => navigate("/")}>
        Volver al Inicio
      </Button>
    </div>
  );
};

export default NotFound;
