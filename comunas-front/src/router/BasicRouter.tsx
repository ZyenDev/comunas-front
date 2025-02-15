// import React from "react";
// import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router";
import Login from "../views/Login"

function BasicRouter() {


    return <>
        <Routes>
            <Route path="/" element={<Login />} />
        </Routes>
    </>
}



export default BasicRouter;