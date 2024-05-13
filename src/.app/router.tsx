import { createBrowserRouter, createHashRouter } from "react-router-dom";
import { HomeView } from "../../src/pages/home/home";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);
