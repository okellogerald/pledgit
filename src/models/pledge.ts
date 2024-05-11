import { z } from "zod";
import { contactSchema } from "./contact";
import { campaignSchema } from "./campaign";

export const pledgeInputSchema = z.object({
  contactId: z.string(),
  campaignId: z.string(),
  amount: z.number(),
  notes: z.string().optional(),
})

export const pledgeSchema = z.object({
  id: z.string(),
  number: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
  contact: contactSchema,
  campaing: campaignSchema,
}).merge(pledgeInputSchema);

export type Pledge = z.infer<typeof pledgeSchema>;

export type PledgeInput = z.infer<typeof pledgeInputSchema>;