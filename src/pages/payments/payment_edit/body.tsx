import { FormRoot } from "@/_components/form";
import { FormFieldInputWithSuffix, SimpleFormField, SimpleInput } from "@/_components/form/simple_components";

import { label } from "@/_components/form/index.styles";

import styles from "./_body.module.css";
import { VSpace } from "@/_components/space";
import { useStore } from "zustand";
import { useEffect, useState } from "react";
import {
  AsyncState,
  isLoading,
  isSuccess,
  trackPromise,
} from "@/utils/promise";
import { FilledButton } from "@/_components/buttons/filled_button";
import { formatAmount, goToDashboard } from "@/utils/utils";
import PledgitSelect from "@/_components/select";
import { pledgesStateStore } from "@/features/pledge/store";

import { Payment, PaymentMethods } from "@/models/payment";
import { PaymentsManager } from "@/features/payment/manager";
import { paymentEditFormValuesStore } from "./store";

const validate = () => {
  const formState = paymentEditFormValuesStore.getState();
  return formState.validate();
};

const editPayment = async () => {
  const valid = validate();
  if (!valid) return;

  const data = paymentEditFormValuesStore.getState().getPaymentInput();
  return await PaymentsManager.instance.add(data);
};

export default function PaymentEditPageBody() {
  const formState = useStore(paymentEditFormValuesStore);
  const pledges = useStore(pledgesStateStore).pledges;

  const [data, setData] = useState<AsyncState<Payment | undefined>>({
    status: "initial",
  });
  const loading = isLoading(data);
  const success = isSuccess(data, { condition: (d) => d !== undefined });
  const disabled = loading || success;

  const submit = async function () {
    const state = await trackPromise(editPayment(), setData);
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
        <h5>Edit Payment</h5>
        <VSpace />
        <FormRoot>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Label lbl="Pledge" />
            <PledgitSelect
              placeholder={"Click to select pledge"}
              onValueChanged={formState.setPledgeId}
              value={formState.getPledgeSelectItem()}
              groups={[
                {
                  id: "pledges",
                  label: "Pledges",
                  items: pledges.map((e) => ({
                    id: e.id,
                    label: formState.getPledgeLabel(e),
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
            <Label lbl="Payment Method" />
            <PledgitSelect
              placeholder={"Click to select payment method"}
              onValueChanged={formState.setPaymentMethod}
              value={formState.getPaymentMethodSelectItem()}
              groups={[
                {
                  id: "payment_methods",
                  label: "Payment Methods",
                  items: Object.values(PaymentMethods).map((e) => ({ id: e, label: e })),
                },
              ]}
            />
          </div>
          <FormFieldInputWithSuffix
            id={"amount"}
            prefix="TZS "
            onChange={formState.setAmount}
            value={formatAmount(formState.amount)}
          />
          <div style={{ width: "100%" }}>
            <Label lbl="Start Date" />
            <SimpleInput
              id={"date"}
              type="date"
              value={formState.date}
              onChange={formState.setDate}
              style={{
                paddingRight: 0,
                marginRight: 0,
              }}
            ></SimpleInput>
          </div>
          <SimpleFormField
            label="Notes (Optional)"
            placeholder=""
            value={formState.notes}
            onChange={formState.setNotes}
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
