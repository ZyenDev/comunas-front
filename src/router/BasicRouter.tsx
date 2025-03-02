import { Route, Routes } from "react-router";
import Landing from "../views/LandingView";
import Login from "../views/LoginView";
import SignIn from "../views/SignInView";
import Dashboard from "../views/DashboardView";
import ComunaViews from "../views/comunas/ComunaViews";
import Consejoscomunales from "../views/consejoscomunales/ConsejoscomunalesView";
import ViviendasViews from "../views/vivienda/ViviendaViews";

function BasicRouter() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="comuna" element={<ComunaViews />} />
          <Route path="consejocomunal" element={<Consejoscomunales />} />
          <Route path="viviendas" element={<ViviendasViews />} />
        </Route>
      </Routes>
    </>
  );
}

export default BasicRouter;
