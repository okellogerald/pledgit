import { OutlineButton } from "@/_components/buttons/outline_button";
import { LoadingIndicator } from "@/_components/loading_indicator";
import { HSpace, VSpace } from "@/_components/space";
import styles from "@/pages/home/styles.module.css";
import { AsyncState, matchAsyncState, trackPromise } from "@/utils/promise";
import { useEffect, useState } from "react";

import cardStyles from "./styles.module.css";
import { Payment } from "@/models/payment";
import { PaymentsManager } from "@/features/payment/manager";
import { formatTZAmount } from "@/utils/formatters";
import { PAYMENTS_ADD_PAGE_ROUTE_NAME } from "../payment_add/element";
import { router } from "@/_app/router";
import { PAYMENT_LIST_PAGE_ROUTE_NAME } from "../payment_list/element";
import { paymentEditFormValuesStore } from "../payment_edit/store";
import { PAYMENTS_EDIT_PAGE_ROUTE_NAME } from "../payment_edit/element";

async function fetchPayments(): Promise<Payment[] | undefined> {
  try {
    return await PaymentsManager.instance.getAll();
  } catch (error) {
    console.log(error);
  }
}

export function PaymentsCard() {
  const [data, setData] = useState<AsyncState<Payment[] | undefined>>({
    status: "initial",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => trackPromise(fetchPayments(), setData);

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
      <p>We faced a problem trying to fetch your payments. Please try again.</p>
      <VSpace />
      <OutlineButton label="Try Again" onClick={tryAgainFN} />
    </div>
  );
};

const DataView = (data: Payment[]) => {
  function add() {
     router.navigate(PAYMENTS_ADD_PAGE_ROUTE_NAME);
  }

  const edit = (payment: Payment) => {
    paymentEditFormValuesStore.getState().setStartValue(payment);
    router.navigate(PAYMENTS_EDIT_PAGE_ROUTE_NAME);
  };

  function seeAll() {
    router.navigate(PAYMENT_LIST_PAGE_ROUTE_NAME);
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
        <h6 className={cardStyles.title}>Payments</h6>
        <div style={{ display: "flex" }}>
          <OutlineButton label="Add New" onClick={add} />
          <HSpace />
          <OutlineButton label="See All" onClick={seeAll} />
        </div>
      </div>
      <VSpace space={20} />
      <table className={cardStyles.table}>
        <thead>
          <tr className={cardStyles.tr}>
            <th>Pledger Name</th>
            <th>Campaign</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.id} onClick={() => edit(e)}>
                <td className={cardStyles.td}>
                  {e.contact.firstName} {e.contact.lastName}
                </td>
                <td className={cardStyles.td}>{e.campaign.name}</td>
                <td className={cardStyles.td}>
                  {formatTZAmount(e.pledge.amount)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
