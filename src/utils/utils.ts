import { redirect } from "react-router-dom";
import { ChangeEvent } from "react";

export function delay(milliseconds: number): Promise<void> {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

export function getRandomID(): string {
  return Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15);
}

export function compareDates(a: Date, b: Date): number {
  return new Date(b).getTime() - new Date(a).getTime();
}

export function compareDays(a: Date, b: Date): number {
  return new Date(b).getDay() - new Date(a).getDay();
}

export function getName(firstName: string, lastName: string): string {
  return `${firstName} ${lastName}`;
}

export function getInitialsFrom(name: string): string {
  let label: string = "";
  const list = name.trim().split(" ");
  if (list.length > 1) {
    label = list[0].trim().substring(0, 1) + list[1].trim().substring(0, 1);
  } else {
    label = list[0].trim().substring(0, 1);
  }
  return label.toUpperCase();
}

export function capitalizeFirstLetter(str: string): string {
  if (str.length === 0) {
    return str; // Return an empty string if input is empty
  }

  const firstLetter = str.charAt(0).toUpperCase();
  const restOfString = str.slice(1).toLowerCase();

  return firstLetter + restOfString;
}

export function getFirstNameOnly(str: string): string {
  if (str.trim().length === 0) {
    return str; // Return an empty string if input is empty
  }

  const names = str.trim().split(" ");
  return names[0].trim();
}

export function isError(e: any): e is Error {
  return e &&
    e.stack &&
    e.message &&
    typeof e.stack === "string" &&
    typeof e.message === "string";
}

export const formatAmount = (
  amount: number,
  options?: { maxFractionDigits?: number },
): string => {
  return Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "TZS",
    maximumFractionDigits: options?.maxFractionDigits ?? 0,
  }).format(amount);
};

export const copyToClipboard = (text: string) => {
  navigator.clipboard.writeText(text);
};

export const validateAmount = (amount: string | number): boolean => {
  const text = amount.toString().trim();

  if (text.length === 0) {
    return false;
  }

  const number = Number(text);
  if (isNaN(number)) {
    return false;
  }

  return true;
};

export const getTrimmedValueFromChangeInputEvent = (e: ChangeEvent): string => {
  const value = ((e.target as any).value as string).trim();
  return value;
};

export const getValueFromChangeInputEvent = (e: ChangeEvent): string => {
  const value = ((e.target as any).value as string);
  return value;
};
