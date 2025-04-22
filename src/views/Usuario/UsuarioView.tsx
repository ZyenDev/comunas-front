import { useState } from "react";
import { useAuth } from "../../components/AuthContext";

const usuario: React.FC = () => {
  const [nombre, setNombre] = useState<string>("john");
  const [rol, setRol] = useState<string>("admin");
  const { token, username, role } = useAuth();
  return (
    <>
      <h1>usuario: {username}</h1>
      <h1>rol : {role}</h1>
    </>
  );
};

export default usuario;
