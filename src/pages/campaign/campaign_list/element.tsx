import { LoaderFunctionArgs } from "react-router-dom";
import { CampaignListPageBody } from "./body";
import Header from "../camapign_add/header";

import styles from "./_styles.module.css";

export const CAMPAIGN_LIST_PAGE_ROUTE_NAME = "/campaign_list";

export function CampaignListPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const CampaignListPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <CampaignListPageBody />
      </div>
    </div>
  );
};
