import { createHashRouter } from "react-router-dom";
import { HomeView } from "../pages/home/home";
import CampaignAddPage, {
  CAMPAIGN_ADD_PAGE_ROUTE_NAME,
} from "@/pages/campaign/camapign_add/campaign_add_page";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: CAMPAIGN_ADD_PAGE_ROUTE_NAME,
    element: <CampaignAddPage />,
  },
]);
