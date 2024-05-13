import { Campaign } from "@/models/campaign";
import { createStore } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const CAMPAIGNS_STATE_STORE_KEY = "campaigns-state-store";

export interface CampaignsState {
  campaigns?: Campaign[];
  setCampaigns: (campaigns: Campaign[]) => void;
  refresh: () => void;
}

export const campaignsStateStore = createStore<CampaignsState, any>(
  persist((set, get) => ({
    campaigns: [],

    setCampaigns(campaigns) {
      set({ campaigns });
    },

    refresh() {
      set({ campaigns: [] });
    },
  }), {
    name: CAMPAIGNS_STATE_STORE_KEY,
    storage: createJSONStorage(() => sessionStorage),
  }),
);
