import React, { createContext, useState, useContext, ReactNode } from "react";
import { useNavigate } from "react-router";

interface AuthContextType {
  // user: User | null;
  token: string | null;
  username: string | null;
  role: string | null;
  login: (token: string, name: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token") || null
  );
  const [username, setUser] = useState<string | null>(
    localStorage.getItem("username") || null
  );
  const [role, setRole] = useState<string | null>(
    localStorage.getItem("role") || null
  );

  const login = (newToken: string, newname: string, newrole: string) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("username", newname);
    localStorage.setItem("role", newrole);
    setUser(newname);
    setRole(newrole);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("role");
    setUser(null);
    setRole(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ token, username, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  if (!context) {
    navigate("/");
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
