import { createBrowserRouter } from "react-router-dom";
import Signup from "../features/auth/pages/Signup.jsx";
import Login from "../features/auth/pages/Login.jsx";

const router = createBrowserRouter([
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/",
    element: <h1>Welcome to Home</h1>,
  },
]);

export default router;
