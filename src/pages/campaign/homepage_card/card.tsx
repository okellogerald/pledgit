import { router } from "@/_app/router";
import { OutlineButton } from "@/_components/buttons/outline_button";
import { LoadingIndicator } from "@/_components/loading_indicator";
import { HSpace, VSpace } from "@/_components/space";
import { CampaignManager } from "@/features/campaign/manager";
import { Campaign } from "@/models/campaign";
import styles from "@/pages/home/styles.module.css";
import { formatDate } from "@/utils/formatters";
import { AsyncState, matchAsyncState, trackPromise } from "@/utils/promise";
import { useEffect, useState } from "react";
import { CAMPAIGN_ADD_PAGE_ROUTE_NAME } from "../camapign_add/campaign_add_page";
import { CAMPAIGN_LIST_PAGE_ROUTE_NAME } from "../campaign_list/element";
import { CAMPAIGN_EDIT_PAGE_ROUTE_NAME } from "../campaign_edit/element";
import { campaignEditFormValuesStore } from "../campaign_edit/store";

import cardStyles from "./styles.module.css";

async function fetchCampaigns(): Promise<Campaign[] | undefined> {
  try {
    return await CampaignManager.instance.getAll();
  } catch (error) {
    console.log(error);
  }
}

export function CampaignsCard() {
  const [data, setData] = useState<AsyncState<Campaign[] | undefined>>({
    status: "initial",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => trackPromise(fetchCampaigns(), setData);

  return matchAsyncState(data, {
    onError: () => ErrorView(fetchData),
    onSuccess: (d) => (d === undefined ? ErrorView(fetchData) : DataView(d)),
    otherwise: LoadingView,
  });
}

function LoadingView(_msg?: string) {
  return (
    <div className={styles.card}>
      <LoadingIndicator />
      <VSpace />
      <p>Loading...</p>
    </div>
  );
}

const ErrorView = (tryAgainFN: () => void) => {
  return (
    <div className={styles.card}>
      <p>
        We faced a problem trying to fetch your campaigns. Please try again.
      </p>
      <VSpace />
      <OutlineButton label="Try Again" onClick={tryAgainFN} />
    </div>
  );
};

const DataView = (data: Campaign[]) => {
  function addCampaign() {
    router.navigate(CAMPAIGN_ADD_PAGE_ROUTE_NAME);
  }

  const editCampaign = (campaign: Campaign) => {
    campaignEditFormValuesStore.getState().setStartValue(campaign);
    router.navigate(CAMPAIGN_EDIT_PAGE_ROUTE_NAME);
  };

  function seeCampaigns() {
    router.navigate(CAMPAIGN_LIST_PAGE_ROUTE_NAME);
  }

  return (
    <div className={styles.card}>
      <div
        style={{
          display: "flex",
          width: "100%",

          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h6 className={cardStyles.title}>Campaigns</h6>
        <div>
          <OutlineButton label="Add New" onClick={addCampaign} />
          <HSpace />
          <OutlineButton label="See All" onClick={seeCampaigns} />
        </div>
      </div>
      <VSpace space={20} />
      <table className={cardStyles.table}>
        <thead>
          <tr className={cardStyles.tr}>
            <th className={cardStyles.th}>Name</th>
            <th className={cardStyles.th}>Start Date</th>
            <th className={cardStyles.th}>End Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((campaign) => {
            return (
              <tr key={campaign.id} onClick={() => editCampaign(campaign)}>
                <td className={cardStyles.td}>
                  <p className={cardStyles.campaign_name}>{campaign.name}</p>
                  {campaign.description && (
                    <p className={cardStyles.campaign_desc}>
                      {campaign.description}
                    </p>
                  )}
                </td>
                <td className={cardStyles.td}>
                  {formatDate(campaign.startDate, { format: "DD/MM/yyyy" })}
                </td>
                <td className={cardStyles.td}>
                  {formatDate(campaign.endDate, { format: "DD/MM/yyyy" })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
