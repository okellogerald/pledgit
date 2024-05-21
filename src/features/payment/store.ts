import { Payment } from "@/models/payment";
import { createStore } from "zustand";

import { createJSONStorage, persist } from "zustand/middleware";

const PAYMENT_STATE_STORE_KEY = "payments-state-store";

export interface PaymentState {
  payments: Payment[];
  setPayments: (list: Payment[]) => void;
  refresh: () => void;
}

export const paymentsStateStore = createStore<PaymentState, any>(
  persist(
    (set, get) => ({
      payments: [],

      setPayments(list) {
        set({ payments: list });
      },

      refresh() {
        set({ payments: [] });
      },
    }),
    {
      name: PAYMENT_STATE_STORE_KEY,
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
