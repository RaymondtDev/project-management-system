import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";
import DashboardHome from "./pages/DashboardHome";
import Projects from "./pages/Projects";
import SingleProject from "./components/SingleProject";
import Login from "./pages/Login";
import Register from "./pages/Register";

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "projects", element: <Projects /> },
      { path: "projects/p/:id", element: <SingleProject /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);

export default AppRoutes;
