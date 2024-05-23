import { FormRoot } from "@/_components/form";
import { SimpleFormField } from "@/_components/form/simple_components";

import styles from "./_body.module.css";
import { VSpace } from "@/_components/space";
import { useStore } from "zustand";
import { contactAddFormValuesStore } from "./store";
import { useState } from "react";
import {
  AsyncState,
  isLoading,
  isSuccess,
  trackPromise,
} from "@/utils/promise";
import { FilledButton } from "@/_components/buttons/filled_button";
import { goToDashboard } from "@/utils/utils";
import { ContactManager } from "@/features/contact/manager";
import { Contact } from "@/models/contact";

const validate = () => {
  const formState = contactAddFormValuesStore.getState();
  return formState.validate();
};

const addPledge = async () => {
  const valid = validate();
  if (!valid) return;

  const data = contactAddFormValuesStore.getState().getContactInput();
  return await ContactManager.instance.add(data);
};

export default function ContactAddPageLoaderBody() {
  const formState = useStore(contactAddFormValuesStore);

  const [data, setData] = useState<AsyncState<Contact | undefined>>({
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
        <h5>Add Contact</h5>
        <VSpace />
        <FormRoot>
          <SimpleFormField
            label="First Name"
            placeholder="E.g John"
            onChange={formState.setFirstName}
          ></SimpleFormField>
          <SimpleFormField
            label="Last Name"
            placeholder="E.g Doe"
            onChange={formState.setLastName}
          ></SimpleFormField>
          <SimpleFormField
            label="Phone Number"
            placeholder="E.g 255756565656"
            type="tel"
            onChange={formState.setPhoneNumber}
          ></SimpleFormField>
          <SimpleFormField
            label="Reference (Optional)"
            placeholder="E.g 123"
            onChange={formState.setReference}
          ></SimpleFormField>
        </FormRoot>
        <VSpace />
        <FilledButton
          fillWidth
          disabled={disabled}
          showLoading={loading}
          onClick={submit}
          label="Continue"
          type="submit"
        />
      </div>
    </>
  );
}
