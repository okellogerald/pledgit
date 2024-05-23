import { createHashRouter } from "react-router-dom";
import { HomeView } from "../pages/home/home";
import CampaignAddPage, {
  CAMPAIGN_ADD_PAGE_ROUTE_NAME,
} from "@/pages/campaign/camapign_add/campaign_add_page";
import {
  CAMPAIGN_LIST_PAGE_ROUTE_NAME,
  CampaignListPage,
} from "@/pages/campaign/campaign_list/element";
import {
  CAMPAIGN_EDIT_PAGE_ROUTE_NAME,
  CampaignEditPage,
  CampaignEditPageLoader,
} from "@/pages/campaign/campaign_edit/element";
import {
  PLEDGE_ADD_PAGE_ROUTE_NAME,
  PledgeAddPage,
  PledgeAddPageLoader,
} from "@/pages/pledge/pledge.add/element";

export const router = createHashRouter([
  {
    path: "/",
    element: <HomeView />,
  },
  {
    path: CAMPAIGN_ADD_PAGE_ROUTE_NAME,
    element: <CampaignAddPage />,
  },
  {
    path: CAMPAIGN_EDIT_PAGE_ROUTE_NAME,
    loader: CampaignEditPageLoader,
    element: <CampaignEditPage />,
  },
  {
    path: CAMPAIGN_LIST_PAGE_ROUTE_NAME,
    element: <CampaignListPage />,
  },
  {
    path: PLEDGE_ADD_PAGE_ROUTE_NAME,
    loader: PledgeAddPageLoader,
    element: <PledgeAddPage />,
  },
]);
