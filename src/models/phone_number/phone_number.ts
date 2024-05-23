import { MobileNumberFormat } from "./format";
import { Telecom, telecomDetails } from "./telecom";

export enum TransactionType {
  toWallet = "C2B",
  fromWallet = "B2C",
}

export class PhoneNumber {
  compactNumber: string;

  constructor(compactNumber: string) {
    this.compactNumber = compactNumber;
  }

  getNumberWithFormat(format: MobileNumberFormat): string {
    return `${format}${this.compactNumber}`;
  }

  get label(): string {
    return this.getNumberWithFormat(MobileNumberFormat.s255);
  }

  get telecom(): Telecom {
    const id = this.compactNumber.substring(0, 2);
    const result = Object.values(telecomDetails).find((e) =>
      e.prefixes.includes(id)
    )!;
    return result;
  }

  getChannel(type: TransactionType): string {
    const label = type;
    const company = this.telecom.label.toUpperCase();
    return `TZ-${company}-${label}`;
  }

  static from(s: string): PhoneNumber | undefined {
    const number = s.trim();
    try {
      let id: string, compactNumber: string;

      if (number.startsWith("+255")) {
        compactNumber = number.substring(4);
      } else if (number.startsWith("255")) {
        compactNumber = number.substring(3);
      } else if (number.startsWith("0")) {
        compactNumber = number.substring(1);
      } else {
        compactNumber = number;
      }

      if (compactNumber.length !== 9) return;
      id = compactNumber.substring(0, 2);

      const telecom = Object.values(telecomDetails).find((e) =>
        e.prefixes.includes(id)
      );
      if (!telecom) return;

      return new PhoneNumber(compactNumber);
    } catch (e) {
      return;
    }
  }
}
