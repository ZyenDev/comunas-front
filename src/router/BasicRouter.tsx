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
import ProtectedRoute from "../components/ProtectedRoute";
import RegistroView from "../views/registros/RegistrosViews";
import Reportes from "../views/Reporte/ReporteView";
import { AuthProvider } from "../components/AuthContext";
import React from "react";

/*admin
Registrar Comuna.
Registrar C.comunal
Registrar parlamentario
Reporte 
 */

/*Parlamentario
Registar Vocero
Reporte
*/

/*Vocero
Registar vivienda
Registrar Habitantes
Reportes
*/

/*habitante
ni idea
*/

//mover a model
interface RouteConfig {
  path: string;
  element: React.FC<{}> | any; // bad any here
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
      { path: "registrar", element: <RegistroView /> },
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
