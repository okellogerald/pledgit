import { Campaign, CampaignEditInput, CampaignInput } from "@/models/campaign";
import { formatDate, parseDate } from "@/utils/formatters";
import {
  ChangeEvent,
  ChangeEventHandler,
  FormEvent,
  FormEventHandler,
} from "react";
import { createStore } from "zustand";

export interface CampaignEditFormState {
  startValue?: Campaign;

  campaignName: string;
  campaignDesc: string;
  startDate: string;
  endDate: string;

  setCampaignName: ChangeEventHandler<HTMLInputElement>;
  setCampaignDescription: FormEventHandler<HTMLTextAreaElement>;
  setStartDate: ChangeEventHandler<HTMLInputElement>;
  setEndDate: ChangeEventHandler<HTMLInputElement>;

  setStartValue: (campaign: Campaign) => void;

  hasAllFieldsFilled: () => boolean;
  validate: () => boolean;

  init: () => void;
  getCampaignEditInput: () => CampaignEditInput;

  hasAnythingChanged: () => boolean;
}

export const campaignEditFormValuesStore = createStore<CampaignEditFormState>()(
  (set, get) => ({
    startValue: undefined,

    campaignName: "",
    campaignDesc: "",
    startDate: "",
    endDate: "",

    setStartValue(campaign) {
      set({ startValue: campaign });
    },

    hasAnythingChanged: () => {
      const startValue = get().startValue;
      if (startValue === undefined) return false;

      const hasSameName = _compareText(startValue.name, get().campaignName);
      const hasSameDesc = _compareText(
        startValue.description ?? "",
        get().campaignDesc,
      );
      const hasSameStart = _compareText(
        _formatDate(startValue.startDate),
        get().startDate,
      );
      const hasSameEnd = _compareText(
        _formatDate(startValue.endDate),
        get().endDate,
      );

      return !(
        hasSameName &&
        hasSameDesc &&
        hasSameStart &&
        hasSameEnd
      );
    },

    init: () => {
      const campaign = get().startValue;
      if (campaign === undefined) return;

      set({
        campaignName: campaign.name,
        campaignDesc: campaign.description,
        startDate: _formatDate(campaign.startDate),
        endDate: _formatDate(campaign.endDate),
      });
    },

    getCampaignEditInput() {
      const data: CampaignEditInput = {
        campaignId: get().startValue!.id,
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
        get().getCampaignEditInput();
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

function _compareText(a: string, b: string) {
  return a.trim().toLowerCase() === b.trim().toLowerCase();
}
