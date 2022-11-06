import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";

import { AuthContext } from "../context/auth";

const PrivateRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PrivateRoute;
