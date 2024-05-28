import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_element.module.css";
import Header from "./header";
import PaymentEditPageBody from "./body";

export const PAYMENTS_EDIT_PAGE_ROUTE_NAME = "/payment_edit";

export function PaymentEditPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const PaymentEditPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <PaymentEditPageBody />
      </div>
    </div>
  );
};
