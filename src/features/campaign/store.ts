import { Campaign } from "@/models/campaign";
import { createStore } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const CAMPAIGNS_STATE_STORE_KEY = "campaigns-state-store";

export interface CampaignsState {
  campaigns: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  refresh: () => void;

  getById: (id: string) => Campaign | undefined;
}

export const campaignsStateStore = createStore<CampaignsState, any>(
  persist(
    (set, get) => ({
      campaigns: [],

      setCampaigns(campaigns) {
        set({ campaigns });
      },

      refresh() {
        set({ campaigns: [] });
      },

      getById(id) {
        return get().campaigns.find((e) => e.id === id);
      },
    }),
    {
      name: CAMPAIGNS_STATE_STORE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
