import { z } from "zod";
import { contactSchema } from "./contact";
import { pledgeSchema } from "./pledge";
import { campaignSchema } from "./campaign";

export const paymentInputSchema = z.object({
  amount: z.number(),
  notes: z.string().optional(),
});

export const paymentSchema = z.object({
  id: z.string(),
  amount: z.number(),
  method: z.string(),
  contactId: z.string(),
  pledgeId: z.string(),
  campaignId: z.string(),
  date: z.string().date(),
  reference: z.string().optional(),
  notes: z.string().optional(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),

  contact: contactSchema,
  pledge: pledgeSchema,
  campaign: campaignSchema,
});

export type Payment = z.infer<typeof paymentSchema>;

export type PaymentInput = z.infer<typeof paymentInputSchema>;

const paymentEditInputSchema = z
  .object({ paymentId: z.string() })
  .merge(paymentInputSchema);

export type PaymentEditInput = z.infer<typeof paymentEditInputSchema>;
