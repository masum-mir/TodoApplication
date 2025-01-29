import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { authService } from "../services/authService";
import { useAuth } from "../auth/AuthContext";
import { ROUTES } from "./routes";

const ProtectedRoute = ({ children }) => {

    const isAuthenticated = authService.isAuthenticated();
    // const { user } = useAuth();
    // const location = useLocation();

    return isAuthenticated ? children : <Navigate to={ROUTES.PUBLIC.LOGIN} />;

};

export default ProtectedRoute;
