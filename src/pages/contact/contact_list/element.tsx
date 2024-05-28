import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_styles.module.css";
import Header from "./header";
import { ContactListPageBody } from "./body";

export const CONTACT_LIST_PAGE_ROUTE_NAME = "/contact_list";

export function ContactListPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const ContactListPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <ContactListPageBody />
      </div>
    </div>
  );
};
