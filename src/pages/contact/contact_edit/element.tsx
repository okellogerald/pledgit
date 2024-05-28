import { LoaderFunctionArgs } from "react-router-dom";

import styles from "./_element.module.css";
import Header from "./header";
import ContactEditPageBody from "./body";

export const CONTACT_EDIT_PAGE_ROUTE_NAME = "/contact_edit";

export function ContactEditPageLoader(_: LoaderFunctionArgs<any>): any {
  return null;
}

export const ContactEditPage: React.FC = () => {
  return (
    <div className={styles.scaffold}>
      <div className={styles.header}>
        <Header />
      </div>
      <div className={styles.body}>
        <ContactEditPageBody />
      </div>
    </div>
  );
};
