import React from "react";
import { Navigate } from 'react-router-dom';
import isLogged from "../middleware/isLogin";

const PublicRoute = ({ children }) => {
    const isLogin = isLogged()
    return isLogin ? <Navigate to="/Home" /> : children
}

export default PublicRoute