import { useState } from "react";

const usuario: React.FC = () => {
  const [nombre, setNombre] = useState<string>("john");
  const [rol, setRol] = useState<string>("admin");

  return (
    <>
      <h1>usuario: {nombre}</h1>
      <h1>rol : {rol}</h1>
    </>
  );
};

export default usuario;
