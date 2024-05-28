import { OutlineButton } from "@/_components/buttons/outline_button";
import { LoadingIndicator } from "@/_components/loading_indicator";
import { HSpace, VSpace } from "@/_components/space";
import styles from "@/pages/home/styles.module.css";
import { formatDate } from "@/utils/formatters";
import { AsyncState, matchAsyncState, trackPromise } from "@/utils/promise";
import { useEffect, useState } from "react";

import cardStyles from "./styles.module.css";
import { Contact } from "@/models/contact";
import { ContactManager } from "@/features/contact/manager";
import { CONTACT_ADD_PAGE_ROUTE_NAME } from "../contact_add/element";
import { router } from "@/_app/router";
import { CONTACT_LIST_PAGE_ROUTE_NAME } from "../contact_list/element";
import { contactEditFormValuesStore } from "../contact_edit/store";
import { CONTACT_EDIT_PAGE_ROUTE_NAME } from "../contact_edit/element";

async function fetchContacts(): Promise<Contact[] | undefined> {
  try {
    return await ContactManager.instance.getAll();
  } catch (error) {
    console.log(error);
  }
}

export function ContactsCard() {
  const [data, setData] = useState<AsyncState<Contact[] | undefined>>({
    status: "initial",
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => trackPromise(fetchContacts(), setData);

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
      <p>We faced a problem trying to fetch your contacts. Please try again.</p>
      <VSpace />
      <OutlineButton label="Try Again" onClick={tryAgainFN} />
    </div>
  );
};

const DataView = (data: Contact[]) => {
  function addContact() {
    router.navigate(CONTACT_ADD_PAGE_ROUTE_NAME);
  }

  const editContact = (contact: Contact) => {
    contactEditFormValuesStore.getState().setStartValue(contact);
    router.navigate(CONTACT_EDIT_PAGE_ROUTE_NAME);
  };

  function seeContacts() {
    router.navigate(CONTACT_LIST_PAGE_ROUTE_NAME);
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
        <h6 className={cardStyles.title}>Contacts</h6>
        <div style={{ display: "flex" }}>
          <OutlineButton label="Add New" onClick={addContact} />
          <HSpace />
          <OutlineButton label="See All" onClick={seeContacts} />
        </div>
      </div>
      <VSpace space={20} />
      <table className={cardStyles.table}>
        <thead>
          <tr className={cardStyles.tr}>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone Number</th>
            <th>Date Added</th>
          </tr>
        </thead>
        <tbody>
          {data.map((e) => {
            return (
              <tr key={e.id} onClick={() => editContact(e)}>
                <td className={cardStyles.td}>{e.firstName}</td>
                <td className={cardStyles.td}>{e.lastName}</td>
                <td className={cardStyles.td}>{e.phone}</td>
                <td className={cardStyles.td}>
                  {formatDate(e.createdAt, { format: "DD/MM/yyyy" })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
