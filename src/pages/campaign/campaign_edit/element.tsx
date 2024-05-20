import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_styles.module.css";
import Header from "./header";
import CampaignEditPageBody from "./body";
import { campaignEditFormValuesStore } from "./store";
import { redirectToDashboard } from "@/utils/utils";

export const CAMPAIGN_EDIT_PAGE_ROUTE_NAME = "/campaign_edit";

export function CampaignEditPageLoader(_: LoaderFunctionArgs<any>): any {
    const campaign = campaignEditFormValuesStore.getState().startValue
    if (campaign === undefined) return redirectToDashboard()

    return null;
}

export const CampaignEditPage: React.FC = () => {
    return (
        <div className={styles.scaffold}>
            <div className={styles.header}>
                <Header />
            </div>
            <div className={styles.body}>
                <CampaignEditPageBody />
            </div>
        </div>
    );
};
