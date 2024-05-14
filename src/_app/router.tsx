import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { HomeView } from "../pages/home/home";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);
