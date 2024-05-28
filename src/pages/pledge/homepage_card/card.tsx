import { OutlineButton } from "@/_components/buttons/outline_button";
import { LoadingIndicator } from "@/_components/loading_indicator";
import { HSpace, VSpace } from "@/_components/space";
import styles from "@/pages/home/styles.module.css";
import { AsyncState, matchAsyncState, trackPromise } from "@/utils/promise";
import { useEffect, useState } from "react";

import cardStyles from "./styles.module.css";
import { Pledge } from "@/models/pledge";
import { PledgesManager } from "@/features/pledge/manager";
import { formatTZAmount } from "@/utils/formatters";
import { router } from "@/_app/router";
import { PLEDGE_ADD_PAGE_ROUTE_NAME } from "../pledge_add/element";
import { PLEDGE_LIST_PAGE_ROUTE_NAME } from "../pledge_list/element";

async function fetchPledges(): Promise<Pledge[] | undefined> {
  try {
    return await PledgesManager.instance.getAll();
  } catch (error) {
    console.log(error);
  }
}

export function PledgesCard() {
  const [data, setData] = useState<AsyncState<Pledge[] | undefined>>({
    status: "initial",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => trackPromise(fetchPledges(), setData);

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
      <p>We faced a problem trying to fetch your pledges. Please try again.</p>
      <VSpace />
      <OutlineButton label="Try Again" onClick={tryAgainFN} />
    </div>
  );
};

const DataView = (data: Pledge[]) => {
  function addPledge() {
    router.navigate(PLEDGE_ADD_PAGE_ROUTE_NAME);
  }

  const editPledge = (e: Pledge) => {
    // campaignEditFormValuesStore.getState().setStartValue(campaign);
    //router.navigate(CAMPAIGN_EDIT_PAGE_ROUTE_NAME);
  };

  function seeList() {
    router.navigate(PLEDGE_LIST_PAGE_ROUTE_NAME);
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
        <h6 className={cardStyles.title}>Pledges</h6>
        <div style={{ display: "flex" }}>
          <OutlineButton label="Add New" onClick={addPledge} />
          <HSpace />
          <OutlineButton label="See All" onClick={seeList} />
        </div>
      </div>
      <VSpace space={20} />
      <table>
        <thead>
          <tr>
            <th>Pledger Name</th>
            <th>Campaign</th>
            <th>Paid Amount</th>
            <th>Pledged Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.id} onClick={() => editPledge(e)}>
                <td>
                  {e.contact.firstName} {e.contact.lastName}{" "}
                </td>
                <td>{e.campaign.name}</td>
                <td> {formatTZAmount(e.paidAmount)}</td>
                <td> {formatTZAmount(e.amount)}</td> 
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
