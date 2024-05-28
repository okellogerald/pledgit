import { FormRoot } from "@/_components/form";
import { input, label } from "@/_components/form/index.styles";
import {FormFieldInputWithSuffix} from "@/_components/form/simple_components";

import styles from "./_body.module.css";
import { VSpace } from "@/_components/space";
import { useStore } from "zustand";
import { pledgeAddFormValuesStore } from "./store";
import { useState } from "react";
import {
  AsyncState,
  isLoading,
  isSuccess,
  trackPromise,
} from "@/utils/promise";
import { FilledButton } from "@/_components/buttons/filled_button";
import { formatAmount, goToDashboard } from "@/utils/utils";
import { PledgesManager } from "@/features/pledge/manager";
import { PledgeInput } from "@/models/pledge";
import PledgitSelect from "@/_components/select";
import { contactsStateStore } from "@/features/contact/store";
import { campaignsStateStore } from "@/features/campaign/store";

const validate = () => {
  const formState = pledgeAddFormValuesStore.getState();
  return formState.validate();
};

const addPledge = async () => {
  const valid = validate();
  if (!valid) return;

  const data = pledgeAddFormValuesStore.getState().getPledgeInput();
  return await PledgesManager.instance.add(data);
};

export default function PledgeAddPageLoaderBody() {
  const formState = useStore(pledgeAddFormValuesStore);
  const contacts = useStore(contactsStateStore).contacts;
  const campaigns = useStore(campaignsStateStore).campaigns;

  const [data, setData] = useState<AsyncState<PledgeInput | undefined>>({
    status: "initial",
  });
  const loading = isLoading(data);
  const success = isSuccess(data, { condition: (d) => d !== undefined });
  const disabled = loading || success;

  const submit = async function () {
    const state = await trackPromise(addPledge(), setData);
    if (state.status === "success" && state.data !== undefined) {
      goToDashboard();
    }
  };

  return (
    <>
      <div className={styles.form}>
        <h5>Add Pledge</h5>
        <VSpace />
        <FormRoot>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Label lbl="Contact" />
            <PledgitSelect
              placeholder={"Click to select contact"}
              onValueChanged={formState.setContact}
              value={formState.getContactSelectItem()}
              groups={[
                {
                  id: "contacts",
                  label: "Contacts",
                  items: contacts.map((e) => ({
                    id: e.id,
                    label: e.firstName + " " + e.lastName,
                  })),
                },
              ]}
            />
          </div>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Label lbl="Campaign" />
            <PledgitSelect
              placeholder={"Click to select campaign"}
              onValueChanged={formState.setCampaign}
              value={formState.getCampaignSelectItem()}
              groups={[
                {
                  id: "campaigns",
                  label: "Campaigns",
                  items: campaigns.map((e) => ({
                    id: e.id,
                    label: e.name,
                  })),
                },
              ]}
            />
          </div>

          <FormFieldInputWithSuffix
            id={"amount"}
            prefix="TZS "
            onChange={formState.setPledgeAmount}
            value={formatAmount(formState.amount)}
          />

          <div style={{ width: "100%" }}>
            <Label lbl="Notes (Optional)" />
            <textarea
              required
              placeholder="Pledge notes"
              style={input}
              onInput={formState.setPledgeNotes}
            ></textarea>
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
