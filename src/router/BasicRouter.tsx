import { Route, Routes } from "react-router"
import Landing from "../views/LandingView"
import Login from "../views/LoginView"
import Dashboard from "../views/DashboardView"



function BasicRouter() {

    return (
        <>
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
        </>
    )
}


export default BasicRouter