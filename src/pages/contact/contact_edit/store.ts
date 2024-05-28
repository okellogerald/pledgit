import { Contact, ContactEditInput, ContactInput } from "@/models/contact";
import { PhoneNumber } from "@/models/phone_number/phone_number";
import { validatePhoneNumber } from "@/models/phone_number/utils";
import { getValueFromChangeInputEvent } from "@/utils/utils";
import { ChangeEvent, ChangeEventHandler } from "react";
import { toast } from "react-toastify";
import { createStore } from "zustand";

export interface ContactEditFormState {
  startValue?: Contact;

  firstName: string;
  lastName: string;
  phoneNumber: string;
  reference: string;

  setFirstName: ChangeEventHandler<HTMLInputElement>;
  setLastName: ChangeEventHandler<HTMLInputElement>;
  setPhoneNumber: ChangeEventHandler<HTMLInputElement>;
  setReference: ChangeEventHandler<HTMLInputElement>;

  hasAllFieldsFilled: () => boolean;
  validate: () => boolean;

  init: () => void;

  setStartValue: (contact: Contact) => void;

  getContactInput: () => ContactEditInput | undefined;
}

export const contactEditFormValuesStore = createStore<ContactEditFormState>()(
  (set, get) => ({
    startValue: undefined,

    firstName: "",
    lastName: "",
    phoneNumber: "",
    reference: "",

    setStartValue(startValue) {
      set({ startValue });
    },

    init() {
      const contact = get().startValue;
      if (contact === undefined) return;

      set({
        firstName: contact.firstName,
        lastName: contact.lastName,
        phoneNumber: contact.phone,
        reference: contact.reference ?? "",
      });
    },

    getContactInput() {
      const startValue = get().startValue;
      if (startValue === undefined) return;

      var ref: string | undefined = get().reference.trim();
      if (ref.length === 0) {
        ref = undefined;
      }

      const phone = PhoneNumber.from(get().phoneNumber)!;

      const data: ContactEditInput = {
        firstName: get().firstName,
        lastName: get().lastName,
        phone: phone.label,
        reference: ref,
        contactId: startValue.id,
      };
      return data;
    },

    hasAllFieldsFilled: () => {
      return (
        get().firstName.trim().length !== 0 &&
        get().lastName.trim().length !== 0 &&
        get().lastName.trim().length !== 0
      );
    },

    validate: () => {
      const hasData = get().hasAllFieldsFilled();

      const valid = validatePhoneNumber(get().phoneNumber);
      if (!valid) {
        toast.error("Please provide a valid TZ phone number");
        return false;
      }

      try {
        get().getContactInput();
      } catch (_) {
        return false;
      }

      return hasData;
    },

    setFirstName(e: ChangeEvent) {
      set({ firstName: getValueFromChangeInputEvent(e) });
    },
    setLastName(e: ChangeEvent) {
      set({ lastName: getValueFromChangeInputEvent(e) });
    },
    setPhoneNumber(e: ChangeEvent) {
      set({ phoneNumber: getValueFromChangeInputEvent(e) });
    },
    setReference(e: ChangeEvent) {
      set({ reference: getValueFromChangeInputEvent(e) });
    },
  }),
);
