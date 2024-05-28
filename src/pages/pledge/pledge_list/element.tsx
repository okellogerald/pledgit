import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_styles.module.css";
import Header from "./header";
import { PledgeListPageBody } from "./body";

export const PLEDGE_LIST_PAGE_ROUTE_NAME = "/pledge_list";

export function PledgeListPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const PledgeListPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <PledgeListPageBody />
      </div>
    </div>
  );
};
