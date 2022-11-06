import React, { useContext } from "react";
import { Route, Navigate } from "react-router-dom";

import { AuthContext } from "../context/auth";

const PublicRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Navigate to="/" /> : <Component {...props} />;
};

export default PublicRoute;
