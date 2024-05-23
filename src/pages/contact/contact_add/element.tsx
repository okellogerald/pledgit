import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_element.module.css";
import Header from "./header";
import PledgeAddPageLoaderBody from "./body";

export const CONTACT_ADD_PAGE_ROUTE_NAME = "/contact_add";

export function ContactAddPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const ContactAddPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <PledgeAddPageLoaderBody />
      </div>
    </div>
  );
};
