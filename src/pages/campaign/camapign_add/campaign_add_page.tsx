import { FormRoot } from "@/_components/form";
import { input, label } from "@/_components/form/index.styles";
import {
  SimpleFormField,
  SimpleInput,
} from "@/_components/form/simple_components";

import styles from "../campaign_edit/_styles.module.css";
import Header from "./header";
import { VSpace } from "@/_components/space";
import { useStore } from "zustand";
import { campaignAddFormValuesStore } from "./store";
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

export const CAMPAIGN_ADD_PAGE_ROUTE_NAME = "campaign-add-page";

const validate = () => {
  const formState = campaignAddFormValuesStore.getState();
  return formState.validate();
};

const addCampaign = async () => {
  const valid = validate();
  if (!valid) return;

  const data = campaignAddFormValuesStore.getState().getCampaignInput();
  return await CampaignManager.instance.add(data);
};

export default function CampaignAddPage() {
  const formState = useStore(campaignAddFormValuesStore);

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
    const state = await trackPromise(addCampaign(), setData);
    if (state.status === "success" && state.data !== undefined) {
      goToDashboard();
    }
  };

  return (
    <>
      <div className={styles.scaffold}>
        <div className={styles.header}>
          <Header />
        </div>
        <div className={styles.body}>
          <div className={styles.form}>
            <h3>Add Campaign</h3>
            <VSpace />
            <FormRoot>
              <SimpleFormField
                label="Campaign Name"
                placeholder="E.g Construction"
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
        </div>
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
