import { PledgitSelectItem } from "@/_components/select";
import { campaignsStateStore } from "@/features/campaign/store";
import { contactsStateStore } from "@/features/contact/store";
import { PledgeInput } from "@/models/pledge";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { createStore } from "zustand";

export interface PledgeAddFormState {
  amount: number;
  notes: string;
  campaignId: string;
  contactId: string;

  setPledgeAmount: ChangeEventHandler<HTMLInputElement>;
  setPledgeNotes: FormEventHandler<HTMLTextAreaElement>;

  setContact: (id: string) => void;
  setCampaign: (id: string) => void;

  hasAllFieldsFilled: () => boolean;
  validate: () => boolean;

  getContactSelectItem: () => PledgitSelectItem | undefined;
  getCampaignSelectItem: () => PledgitSelectItem | undefined;

  getPledgeInput: () => PledgeInput;
}

export const pledgeAddFormValuesStore = createStore<PledgeAddFormState>()(
  (set, get) => ({
    amount: 0,
    notes: "",
    campaignId: "",
    contactId: "",

    getPledgeInput() {
      var notes: string | undefined = get().notes.trim();
      if (notes.length === 0) {
        notes = undefined;
      }

      const data: PledgeInput = {
        amount: get().amount,
        notes: notes,
        campaignId: get().campaignId,
        contactId: get().contactId,
      };
      return data;
    },

    hasAllFieldsFilled: () => {
      return (
        get().amount !== 0 &&
        get().campaignId.trim().length !== 0 &&
        get().contactId.trim().length !== 0
      );
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
      let value = (e.target as any).value;
      value = value.replace(/[^0-9]/g, "");
      if (value.trim().length === 0) {
        value = "0";
      }

      let amount = 0;
      try {
        amount = parseInt(value);
      } catch (_) {}

      set({ amount });
    },
    setPledgeNotes(e: FormEvent) {
      set({ notes: (e.target as any).value });
    },

    setCampaign(cmpgn) {
      set({ campaignId: cmpgn });
    },
    setContact(contact) {
      set({ contactId: contact });
    },

    getContactSelectItem() {
      const contact = contactsStateStore.getState().getById(get().contactId);
      if (!contact) return undefined;

      const item: PledgitSelectItem = {
        id: contact.id,
        label: contact.firstName + " " + contact.lastName,
      };
      return item;
    },
    getCampaignSelectItem() {
      const contact = campaignsStateStore.getState().getById(get().campaignId);
      if (!contact) return undefined;

      const item: PledgitSelectItem = {
        id: contact.id,
        label: contact.name,
      };
      return item;
    },
  }),
);
