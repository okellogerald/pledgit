import { Pledge } from "@/models/pledge";
import { createStore } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const PLEDGE_STATE_STORE_KEY = "pledge-state-store";

export interface PledgesState {
  pledges: Pledge[];
  setPledges: (list: Pledge[]) => void;
  refresh: () => void;
}

export const pledgesStateStore = createStore<PledgesState, any>(
  persist(
    (set, get) => ({
      pledges: [],

      setPledges(list) {
        set({ pledges: list });
      },

      refresh() {
        set({ pledges: [] });
      },
    }),
    {
      name: PLEDGE_STATE_STORE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
