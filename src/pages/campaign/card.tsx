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
import { CAMPAIGN_ADD_PAGE_ROUTE_NAME } from "./camapign_add/campaign_add_page";
import { CAMPAIGN_LIST_PAGE_ROUTE_NAME } from "./campaign_list/page/element";

const cardColor = "#f6f6f6";

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
    <div className={styles.card} style={{ backgroundColor: cardColor }}>
      <LoadingIndicator />
      <VSpace />
      <p>Loading...</p>
    </div>
  );
}

const ErrorView = (tryAgainFN: () => void) => {
  return (
    <div className={styles.card} style={{ backgroundColor: cardColor }}>
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

  function seeCampaigns() {
    router.navigate(CAMPAIGN_LIST_PAGE_ROUTE_NAME);
  }

  return (
    <div className={styles.card} style={{ backgroundColor: cardColor }}>
      <div
        style={{
          display: "flex",
          width: "100%",

          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h3>Campaigns</h3>
        <div>
          <OutlineButton label="Add New" onClick={addCampaign} />
          <HSpace />
          <OutlineButton label="See All" onClick={seeCampaigns} />
        </div>
      </div>
      <VSpace space={20} />
      <table>
        <tr>
          <th>Name</th>
          <th>Start Date</th>
          <th>End Date</th>
        </tr>
        {data.map((campaign) => {
          return (
            <tr key={campaign.id}>
              <td>
                <h5>{campaign.name}</h5>
                {campaign.description && <p>{campaign.description}</p>}
              </td>
              <td>{formatDate(campaign.startDate)}</td>
              <td>{formatDate(campaign.endDate)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
