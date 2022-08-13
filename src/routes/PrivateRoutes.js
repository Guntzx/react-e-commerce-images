import React from "react";
import { Navigate } from 'react-router-dom';
import isLogged from "../middleware/isLogin";

const PrivateRoute = ({ children }) => {
    const isLogin = isLogged()
    return isLogin ? children : <Navigate to="/" />
}

export default PrivateRoute