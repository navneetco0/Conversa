import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { useSelector } from "react-redux";

const PrivateRoute = ({auth, children }) => {
  const { token } = useSelector((state) => state.auth);
  if(!auth) return token ? <Navigate to="/" /> : children;
  return token ? children : <Navigate to="/login" />;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/login" element={<PrivateRoute auth={false} >{<LoginPage/>}</PrivateRoute>} exact />
      <Route path="/" element={<PrivateRoute auth={true}>{<Home />}</PrivateRoute>} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
