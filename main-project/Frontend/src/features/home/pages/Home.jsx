import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../auth/AuthProvider";
import useAuth from "../../auth/hooks/useAuth";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <div>
      <h1>{user?.username}</h1>
      <h2>{user?.email}</h2>
    </div>
  );
};

export default Home;
