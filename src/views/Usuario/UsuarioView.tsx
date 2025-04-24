import { useAuth } from "../../components/AuthContext";

const usuario: React.FC = () => {
  const { username, role } = useAuth();
  return (
    <>
      <h1>usuario: {username}</h1>
      <h1>rol : {role}</h1>
    </>
  );
};

export default usuario;
