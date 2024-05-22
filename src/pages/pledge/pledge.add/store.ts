import { Campaign, CampaignInput } from "@/models/campaign";
import { Contact } from "@/models/contact";
import { PledgeInput } from "@/models/pledge";
import { formatDate, parseDate } from "@/utils/formatters";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { createStore } from "zustand";

export interface PledgeAddFormState {
  amount: string;
  notes: string;
  cmpgn?: Campaign;
  contact?: Contact;

  setPledgeAmount: ChangeEventHandler<HTMLInputElement>;
  setPledgeNotes: FormEventHandler<HTMLTextAreaElement>;

  setContact: (contact: Contact) => void;
  setCampaign: (campaign: Campaign) => void;

  hasAllFieldsFilled: () => boolean;
  validate: () => boolean;

  getPledgeInput: () => PledgeInput;
}

export const campaignAddFormValuesStore = createStore<PledgeAddFormState>()(
  (set, get) => ({
    amount: "",
    notes: "",
    cmpgn: undefined,
    contact: undefined,

    getPledgeInput() {
      const data: PledgeInput = {
        amount: Number.parseFloat(get().amount),
        notes: get().notes,
        campaignId: get().cmpgn!.id,
        contactId: get().contact!.id,
      };
      return data;
    },

    hasAllFieldsFilled: () => {
      return false;
    },

    validate: () => {
      const hasData = get().hasAllFieldsFilled();

      try {
        get().getPledgeInput();
      } catch (_) {
        return false;
      }

      return hasData;
    },

    setPledgeAmount(e: ChangeEvent) {
      set({ amount: (e.target as any).value });
    },
    setPledgeNotes(e: FormEvent) {
      set({ notes: (e.target as any).value });
    },

    setCampaign(cmpgn) {
      set({ cmpgn });
    },
    setContact(contact) {
      set({ contact });
    },
  }),
);

function _formatDate(date: moment.MomentInput) {
  return formatDate(date, { format: "YYYY-MM-DD" });
}
