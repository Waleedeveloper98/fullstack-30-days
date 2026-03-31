import { createBrowserRouter } from "react-router-dom";
import Signup from "../features/auth/pages/Signup.jsx";
import Login from "../features/auth/pages/Login.jsx";
import Home from "../features/home/pages/Home.jsx";
import AppLayout from "./AppLayout.jsx";
import Protected from "../../../Backend/src/Protected.jsx";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      { path: "/signup", element: <Signup /> },
      { path: "/login", element: <Login /> },
      {
        path: "/",
        element: (
          <Protected>
            <Home />
          </Protected>
        ),
      },
    ],
  },
]);

export default router;
