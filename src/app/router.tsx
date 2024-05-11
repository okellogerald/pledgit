import { createBrowserRouter } from "react-router-dom";
import { HomeView } from "../../src/pages/home/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeView />,
  },
]);
