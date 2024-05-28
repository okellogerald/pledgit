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
} from "@/pages/pledge/pledge_add/element";
import {
  CONTACT_ADD_PAGE_ROUTE_NAME,
  ContactAddPage,
  ContactAddPageLoader,
} from "@/pages/contact/contact_add/element";
import { PAYMENTS_ADD_PAGE_ROUTE_NAME, PaymentAddPage, PaymentAddPageLoader } from "@/pages/payments/payment_add/element";
import { PAYMENT_LIST_PAGE_ROUTE_NAME, PaymentListPage, PaymentListPageLoader } from "@/pages/payments/payment_list/element";
import { PLEDGE_LIST_PAGE_ROUTE_NAME, PledgeListPage, PledgeListPageLoader } from "@/pages/pledge/pledge_list/element";
import { CONTACT_LIST_PAGE_ROUTE_NAME, ContactListPage, ContactListPageLoader } from "@/pages/contact/contact_list/element";

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
  {
    path: CONTACT_ADD_PAGE_ROUTE_NAME,
    loader: ContactAddPageLoader,
    element: <ContactAddPage />,
  },
  {
    path: CONTACT_LIST_PAGE_ROUTE_NAME,
    loader: ContactListPageLoader,
    element: <ContactListPage />,
  },
  {
    path: PAYMENTS_ADD_PAGE_ROUTE_NAME,
    loader: PaymentAddPageLoader,
    element: <PaymentAddPage />,
  },
  {
    path: PAYMENT_LIST_PAGE_ROUTE_NAME,
    loader: PaymentListPageLoader,
    element: <PaymentListPage />,
  },
  {
    path: PLEDGE_LIST_PAGE_ROUTE_NAME,
    loader: PledgeListPageLoader,
    element: <PledgeListPage />,
  },
]);
