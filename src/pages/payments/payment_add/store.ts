import { PledgitSelectItem } from "@/_components/select";
import { pledgesStateStore } from "@/features/pledge/store";
import { PaymentInput, PaymentMethod, PaymentMethods } from "@/models/payment";
import { Pledge } from "@/models/pledge";
import { formatDate, formatTZAmount } from "@/utils/formatters";
import { getValueFromChangeInputEvent } from "@/utils/utils";
import { ChangeEvent, ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import { createStore } from "zustand";

export interface ContactAddFormState {
  notes: string;
  date: string;
  pledgeId: string;
  reference: string;
  paymentMethod: PaymentMethod;
  amount: number;

  setNotes: ChangeEventHandler<HTMLInputElement>;
  setDate: ChangeEventHandler<HTMLInputElement>;
  setReference: ChangeEventHandler<HTMLInputElement>;
  setAmount: ChangeEventHandler<HTMLInputElement>;
  
  setPledgeId: (e: string) => void;
  setPaymentMethod: (e: string) => void;

  hasAllFieldsFilled: () => boolean;
  validate: () => boolean;

  getPaymentInput: () => PaymentInput;
  getPledgeSelectItem: () => PledgitSelectItem | undefined;
  getPaymentMethodSelectItem: () => PledgitSelectItem | undefined;
  
  getPledgeLabel: (e: Pledge) => string;
}

export const paymentAddFormValuesStore = createStore<ContactAddFormState>()(
  (set, get) => ({
    notes: "",
    date: "",
    pledgeId: "",
    reference: "",
    paymentMethod: "Cash",
    amount: 0,
    
    setPaymentMethod: (id) => {
      const paymentMethod = PaymentMethods.filter((e) => e === id)[0];
      set({paymentMethod})
    },

    getPaymentInput() {
      var ref: string | undefined = get().reference.trim();
      if (ref.length === 0) {
        ref = undefined;
      }
      
      var notes: string | undefined = get().notes.trim();
      if (notes.length === 0) {
        notes = undefined;
      }

      const data: PaymentInput = {
        notes: notes,
        reference: ref,
        date: get().date,
        amount: get().amount,
        pledgeId: get().pledgeId,
        method: get().paymentMethod,
      };
      return data;
    },

    hasAllFieldsFilled: () => {
      return (
        get().pledgeId.trim().length !== 0 &&
        get().date.trim().length !== 0 &&
        get().amount !== 0 
      );
    },
    
    setAmount(e: ChangeEvent) {
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

    validate: () => {
      const hasData = get().hasAllFieldsFilled();

      const pledge = pledgesStateStore.getState().pledges.filter((e) => e.id === get().pledgeId)
      if (!pledge) {
        toast.error("We could not find a pledge with that pledge ID");
        return false;
      }

      try {
        get().getPaymentInput();
      } catch (_) {
        return false;
      }

      return hasData;
    },

    setNotes(e: ChangeEvent) {
      set({ notes: getValueFromChangeInputEvent(e) });
    },
    setPledgeId(pledgeId: string) {
      set({ pledgeId });
    },
    setReference(e: ChangeEvent) {
      set({ reference: getValueFromChangeInputEvent(e) });
    },
    setDate(e: ChangeEvent) {
      var formattedDate = _formatDate((e.target as any).value);
      set({ date: formattedDate });
    },
    
    getPledgeLabel: (e) => {
      return `${e.contact.firstName} ${e.contact.lastName} (${e.campaign.name} ${formatTZAmount(e.amount)})`;
    },
    
    getPledgeSelectItem() {
      const pledge = pledgesStateStore.getState().pledges.find((e) => e.id === get().pledgeId);
      if(!pledge) return undefined
      
      return {
        id: pledge!.id,
        label: this.getPledgeLabel(pledge)
      }
    },

    getPaymentMethodSelectItem() {
      const item: PledgitSelectItem = {
        id: get().paymentMethod,
        label: get().paymentMethod,
      };
      return item;
    }
  }),
);

function _formatDate(date: moment.MomentInput) {
  return formatDate(date, { format: "YYYY-MM-DD" });
}
