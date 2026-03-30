import { createBrowserRouter } from "react-router-dom";
import Signup from "../features/auth/pages/Signup.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Home from "../features/home/pages/Home.jsx";
import AppLayout from "./AppLayout.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      { path: "/", element: <Home /> },
    ],
  },
]);

export default router;
