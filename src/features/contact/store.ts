import { Contact } from "@/models/contact";
import { createStore } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const CONTACTS_STATE_STORE_KEY = "contacts-state-store";

export interface ContactsState {
  contacts: Contact[];
  setContacts: (list: Contact[]) => void;
  refresh: () => void;
}

export const contactsStateStore = createStore<ContactsState, any>(
  persist(
    (set, get) => ({
      contacts: [],

      setContacts(list) {
        set({ contacts: list });
      },

      refresh() {
        set({ contacts: [] });
      },
    }),
    {
      name: CONTACTS_STATE_STORE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
