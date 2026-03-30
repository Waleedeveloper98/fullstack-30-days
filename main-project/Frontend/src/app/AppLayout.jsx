import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import useAuth from "../features/auth/hooks/useAuth";
import { AuthContext } from "../features/auth/AuthProvider";

const AppLayout = () => {
  const { handleGetMe } = useAuth();
  const { loading } = useContext(AuthContext);

  useEffect(() => {
    handleGetMe();
  }, []);

  if (loading) return <div>Loading...</div>;
  return <Outlet />;
};

export default AppLayout;
