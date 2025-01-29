import React from "react";
import { Navigate } from "react-router-dom";
import { authService } from "../services/authService";
import { ROUTES } from "./routes";
import { useAuth } from "../auth/AuthContext";

const PublicRoute = ({ children }) => {
    const isAuthenticated = authService.isAuthenticated();
    // const {user} = useAuth();
    // console.log("user:: ", user)
  return isAuthenticated ? <Navigate to={ROUTES.PRIVATE.DASHBOARD}   /> : children;
};

export default PublicRoute;
