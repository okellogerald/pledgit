import { PhoneNumber } from "./phone_number";

export const validatePhoneNumber = (phoneNumber: string): boolean => {
  const text = phoneNumber.trim();

  if (text.length === 0) {
    return false;
  }

  const phone = PhoneNumber.from(text);
  if (phone === undefined) {
    return false;
  }

  return true;
};
