export enum TelecomID {
  vodacom = "vodacom",
  airtel = "airtel",
  tigo = "tigo",
  halopesa = "halopesa",
}

export interface Telecom {
  id: TelecomID;
  prefixes: string[];
  label: string;
  company: string;
}

export const telecomDetails: Record<TelecomID, Telecom> = {
  vodacom: {
    id: TelecomID.vodacom,
    prefixes: ["74", "75", "76"],
    label: "Vodacom",
    company: "M-Pesa",
  },
  airtel: {
    id: TelecomID.airtel,
    prefixes: ["78", "79", "68", "69"],
    label: "Airtel",
    company: "Airtel-Money",
  },
  tigo: {
    id: TelecomID.tigo,
    prefixes: ["71", "65", "67", "77"],
    label: "Tigo",
    company: "Tigo-Pesa",
  },
  halopesa: {
    id: TelecomID.halopesa,
    prefixes: ["62", "61"],
    label: "Halotel",
    company: "Halo-Pesa",
  },
};
