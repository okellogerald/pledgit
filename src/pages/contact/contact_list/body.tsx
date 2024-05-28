import Table from "@/_components/table";
import { useStore } from "zustand";

import styles from "./_styles.module.css";
import { ColDef } from "@ag-grid-community/core";
import { contactsStateStore } from "@/features/contact/store";
import { Contact } from "@/models/contact";

export function ContactListPageBody() {
  const contacts = useStore(contactsStateStore).contacts;

  const columns: ColDef<Contact>[] = [
    { field: "firstName" },
    { field: "lastName" },
    { field: "phone" },
  ];

  return (
    <>
      <div className={styles.body}>
        <h4>Contacts</h4>
        {contacts.length > 0 && (
          <div className={styles.table}>
            <Table columns={columns} data={contacts} />
          </div>
        )}
      </div>
    </>
  );
}
