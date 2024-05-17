import { CampaignInput } from "@/models/campaign";
import { formatDate, parseDate } from "@/utils/formatters";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { createStore } from "zustand";

interface CampaignAddFormState {
  campaignName: string;
  campaignDesc: string;
  startDate: string;
  endDate: string;

  setCampaignName: ChangeEventHandler<HTMLInputElement>;
  setCampaignDescription: FormEventHandler<HTMLTextAreaElement>;
  setStartDate: ChangeEventHandler<HTMLInputElement>;
  setEndDate: ChangeEventHandler<HTMLInputElement>;

  hasAllFieldsFilled: () => boolean;
  validate: () => boolean;

  init: () => void;
  getCampaignInput: () => CampaignInput;
}

export const campaignAddFormValuesStore = createStore<CampaignAddFormState>()(
  (set, get) => ({
    campaignName: "",
    campaignDesc: "",
    startDate: "",
    endDate: "",

    init: () => {
      var currentDate = new Date();
      var previousMonthDate = new Date(currentDate);
      previousMonthDate.setMonth(currentDate.getMonth() - 1);

      var defaultEndDate = _formatDate(currentDate);
      var defaultStartDate = _formatDate(previousMonthDate);

      set({ startDate: defaultStartDate, endDate: defaultEndDate });
    },

    getCampaignInput() {
      const data: CampaignInput = {
        name: get().campaignName,
        description: get().campaignDesc,
        startDate: parseDate(get().startDate),
        endDate: parseDate(get().endDate),
      };
      return data;
    },

    hasAllFieldsFilled: () => {
      return (
        get().campaignName.trim().length > 0 &&
        get().campaignDesc.trim().length > 0 &&
        get().startDate.trim().length > 0 &&
        get().endDate.trim().length > 0
      );
    },

    validate: () => {
      const hasData = get().hasAllFieldsFilled();

      try {
        get().getCampaignInput();
      } catch (_) {
        return false;
      }

      return hasData;
    },

    setCampaignName(e: ChangeEvent) {
      set({ campaignName: (e.target as any).value });
    },
    setCampaignDescription(e: FormEvent) {
      set({ campaignDesc: (e.target as any).value });
    },

    setStartDate(e: ChangeEvent) {
      var formattedDate = _formatDate((e.target as any).value);
      set({ startDate: formattedDate });
    },
    setEndDate(e: ChangeEvent) {
      var formattedDate = _formatDate((e.target as any).value);
      set({ endDate: formattedDate });
    },
  }),
);

function _formatDate(date: moment.MomentInput) {
  return formatDate(date, { format: "YYYY-MM-DD" });
}
