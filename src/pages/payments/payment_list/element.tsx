import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_styles.module.css";
import Header from "./header";
import { PaymentListPageBody } from "./body";

export const PAYMENT_LIST_PAGE_ROUTE_NAME = "/payment_list";

export function PaymentListPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const PaymentListPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <PaymentListPageBody />
      </div>
    </div>
  );
};
