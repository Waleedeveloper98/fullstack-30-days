import React, { useContext } from "react";
import { AuthContext } from "../../Frontend/src/features/auth/AuthProvider";
import { Navigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useContext(AuthContext);
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return <div>{children}</div>;
};

export default Protected;
