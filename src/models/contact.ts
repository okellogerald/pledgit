import { z } from "zod";

export const contactInputSchema = z.object({
  phone: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  reference: z.string().optional(),
});

export const contactSchema = z.object({
  id: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
}).merge(contactInputSchema);

export type Contact = z.infer<typeof contactSchema>;

export type ContactInput = z.infer<typeof contactSchema>;
