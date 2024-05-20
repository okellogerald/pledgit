import { FormRoot } from "@/_components/form";
import { input, label } from "@/_components/form/index.styles";
import {
  SimpleFormField,
  SimpleInput,
} from "@/_components/form/simple_components";

import styles from "./_styles.module.css";
import { VSpace } from "@/_components/space";
import { useStore } from "zustand";
import { CampaignManager } from "@/features/campaign/manager";
import { useEffect, useState } from "react";
import {
  AsyncState,
  isLoading,
  isSuccess,
  trackPromise,
} from "@/utils/promise";
import { Campaign } from "@/models/campaign";
import { FilledButton } from "@/_components/buttons/filled_button";
import { goToDashboard } from "@/utils/utils";
import { campaignEditFormValuesStore } from "./store";
import { router } from "@/_app/router";

const validate = () => {
  const formState = campaignEditFormValuesStore.getState();
  return formState.validate();
};

const editCampaign = async () => {
  const valid = validate();
  if (!valid) return;

  const state = campaignEditFormValuesStore.getState();
  if (!state.hasAnythingChanged()) {
    history.back();
    return;
  }

  const data = state.getCampaignEditInput();
  return await CampaignManager.instance.edit(data);
};

export default function CampaignEditPageBody() {
  const formState = useStore(campaignEditFormValuesStore);

  const [data, setData] = useState<AsyncState<Campaign | undefined>>({
    status: "initial",
  });
  const loading = isLoading(data);
  const success = isSuccess(data, { condition: (d) => d !== undefined });
  const disabled = loading || success;

  useEffect(() => {
    formState.init();
  }, []);

  const submit = async function () {
    const state = await trackPromise(editCampaign(), setData);
    if (state.status === "success" && state.data !== undefined) {
      goToDashboard();
    }
  };

  return (
    <>
      <div className={styles.form}>
        <h3>Edit Campaign</h3>
        <VSpace />
        <FormRoot>
          <SimpleFormField
            label="Campaign Name"
            placeholder="E.g Construction"
            value={formState.campaignName}
            onChange={formState.setCampaignName}
          >
            {" "}
          </SimpleFormField>
          <div style={{ width: "100%" }}>
            <Label lbl="Campaign Description" />
            <textarea
              required
              placeholder="E.g Expanding the church building"
              style={input}
              value={formState.campaignDesc}
              onInput={formState.setCampaignDescription}
            ></textarea>
          </div>
          <div style={{ width: "100%" }}>
            <Label lbl="Start Date" />
            <SimpleInput
              id={"start-date"}
              type="date"
              value={formState.startDate}
              onChange={formState.setStartDate}
              style={{
                paddingRight: 0,
                marginRight: 0,
              }}
            ></SimpleInput>
          </div>
          <div style={{ width: "100%" }}>
            <Label lbl="End Date" />
            <SimpleInput
              id={"end-date"}
              type="date"
              value={formState.endDate}
              onChange={formState.setEndDate}
              style={{
                paddingRight: 0,
                marginRight: 0,
              }}
            ></SimpleInput>
          </div>

          <FilledButton
            fillWidth
            disabled={disabled}
            showLoading={loading}
            onClick={submit}
            label="Continue"
            type="submit"
          />
        </FormRoot>
      </div>
    </>
  );
}

const Label: React.FC<{ lbl: string }> = ({ lbl }) => {
  return (
    <p
      style={{
        ...label,
        marginBottom: 5,
      }}
    >
      {lbl}
    </p>
  );
};
