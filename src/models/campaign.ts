import { z } from "zod";

export const campaignInputSchema = z.object({
  name: z.string(),
  startDate: z.coerce.date(),
  endDate: z.coerce.date(),
  description: z.string().optional(),
});

export const campaignSchema = z
  .object({
    id: z.string(),
    createdAt: z.coerce.date(),
    updatedAt: z.coerce.date(),
    pledgedAmount: z.number(),
    paidAmount: z.number(),
    unpaidAmount: z.number(),
  })
  .merge(campaignInputSchema);

export type Campaign = z.infer<typeof campaignSchema>;

export type CampaignInput = z.infer<typeof campaignInputSchema>;

const campaignEditInputSchema = z.object({
  campaignId: z.string(),
}).merge(campaignInputSchema);

export type CampaignEditInput = z.infer<typeof campaignEditInputSchema>;
