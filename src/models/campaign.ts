import { z } from "zod";

export const campaignInputSchema = z.object({
  name: z.string(),
  startDate: z.string().date(),
  endDate: z.string().date(),
  description: z.string().optional(),
});

export const campaignSchema = z.object({
  id: z.string(),
  createdAt: z.string().date(),
  updatedAt: z.string().date(),
}).merge(campaignInputSchema);

export type Campaign = z.infer<typeof campaignSchema>;

export type CampaignInput = z.infer<typeof campaignInputSchema>;
