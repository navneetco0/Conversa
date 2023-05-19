import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "./app/store";

interface PrivateRouteProps {
  auth: boolean;
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ auth, children }) => {
  const { token } = useSelector((state: RootState) => state.auth);
  if (!auth) return token ? <Navigate to="/" /> : <>{children}</>;
  return token ? <>{children}</> : <Navigate to="/login" />;
};

export default PrivateRoute;
