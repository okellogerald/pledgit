import { FormRoot } from "@/_components/form";
import { SimpleFormField } from "@/_components/form/simple_components";

import styles from "./_body.module.css";
import { VSpace } from "@/_components/space";
import { useStore } from "zustand";
import { contactEditFormValuesStore } from "./store";
import { useEffect, useState } from "react";
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
  const formState = contactEditFormValuesStore.getState();
  return formState.validate();
};

const editContact = async () => {
  const valid = validate();
  if (!valid) return;

  const data = contactEditFormValuesStore.getState().getContactInput();
  if(!data) return;

  return await ContactManager.instance.edit(data);
};

export default function ContactEditPageBody() {
  const formState = useStore(contactEditFormValuesStore);

  const [data, setData] = useState<AsyncState<Contact | undefined>>({
    status: "initial",
  });
  const loading = isLoading(data);
  const success = isSuccess(data, { condition: (d) => d !== undefined });
  const disabled = loading || success;

  const submit = async function () {
    const state = await trackPromise(editContact(), setData);
    console.log(state);
    if (state.status === "success" && state.data !== undefined) {
      goToDashboard();
    }
  };

  useEffect(() => {
    formState.init();
  }, [])

  return (
    <>
      <div className={styles.form}>
        <h5>Edit Contact</h5>
        <VSpace />
        <FormRoot>
          <SimpleFormField
            label="First Name"
            placeholder="E.g John"
            value={formState.firstName}
            onChange={formState.setFirstName}
          ></SimpleFormField>
          <SimpleFormField
            label="Last Name"
            placeholder="E.g Doe"
            value={formState.lastName}
            onChange={formState.setLastName}
          ></SimpleFormField>
          <SimpleFormField
            label="Phone Number"
            placeholder="E.g 255756565656"
            type="tel"
            value={formState.phoneNumber}
            onChange={formState.setPhoneNumber}
          ></SimpleFormField>
          <SimpleFormField
            label="Reference (Optional)"
            placeholder="E.g 123"
            value={formState.reference}
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
