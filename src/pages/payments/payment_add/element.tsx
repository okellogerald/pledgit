import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_element.module.css";
import Header from "./header";
import PaymentAddPageLoaderBody from "./body";

export const PAYMENTS_ADD_PAGE_ROUTE_NAME = "/payment_add";

export function PaymentAddPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const PaymentAddPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <PaymentAddPageLoaderBody />
      </div>
    </div>
  );
};
