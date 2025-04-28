import { Route, Routes } from "react-router";
import Landing from "../views/LandingView";
import Login from "../views/LoginView";
import SignIn from "../views/SignInView";
import Dashboard from "../views/DashboardView";
import ComunaViews from "../views/comunas/ComunaViews";
import Consejoscomunales from "../views/consejoscomunales/ConsejoscomunalesView";
import ViviendasViews from "../views/vivienda/ViviendaViews";
import Usuarios from "../views/Usuario/UsuarioView";
import Habitante from "../views/habitante/HabitanteViews";
import NotFound from "../views/NotFound";
import RegistroViewsGen from "../views/Registros/RegistrosViews.tsx";
import ProtectedRoute from "../components/ProtectedRoute";
import Reportes from "../views/Reporte/ReporteHabitanteView";
import Reportesgen from "../views/Reporte/ReportesGenView";
import { AuthProvider } from "../components/AuthContext";
import React from "react";

//mover a model
interface RouteConfig {
  path: string;
  element: React.FC<{}> | any; //TODO: FIX this bad any here
  children?: child[];
  protected?: boolean;
  role?: number;
}

interface child {
  path: string;
  element: React.FC<{}> | any;
  role?: number;
}

//data ruta
const routeConfig: RouteConfig[] = [
  { path: "/", element: <Landing /> },
  { path: "/login", element: <Login /> },
  { path: "/signin", element: <SignIn /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true,
    children: [
      { path: "comuna", element: <ComunaViews /> },
      { path: "consejocomunal", element: <Consejoscomunales /> },
      { path: "registrar", element: <RegistroViewsGen /> },
      { path: "viviendas", element: <ViviendasViews /> },
      { path: "usuario", element: <Usuarios /> },
      {
        path: "viviendas/habitantes/",
        element: <Habitante />,
      },
      {
        path: "viviendas/habitantes/:id_habitantes",
        element: <Habitante />,
      },
      { path: "reporte", element: <Reportes /> },
      { path: "reportegen", element: <Reportesgen /> },
    ],
  },
  { path: "*", element: <NotFound /> },
];

function BasicRouter() {
  return (
    <>
      <AuthProvider>
        <Routes>
          {routeConfig.map((route) => {
            if (route.children) {
              const routes = (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.element}
                >
                  {route.children.map((child) => (
                    <Route
                      key={child.path}
                      path={child.path}
                      element={child.element}
                    />
                  ))}
                </Route>
              );

              const routePriv = (
                <Route element={<ProtectedRoute />}>
                  <Route
                    key={route.path}
                    path={route.path}
                    element={route.element}
                  >
                    {route.children.map((child) => (
                      <Route
                        key={child.path}
                        path={child.path}
                        element={child.element}
                      />
                    ))}
                  </Route>
                </Route>
              );
              return route.protected ? routePriv : routes;
            }
            return (
              <Route
                key={route.path}
                path={route.path}
                element={route.element}
              />
            );
          })}
        </Routes>
      </AuthProvider>
    </>
  );
}

export default BasicRouter;
