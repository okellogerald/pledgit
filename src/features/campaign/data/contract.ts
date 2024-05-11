import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { campaignInputSchema, campaignSchema } from "../../../models/campaign";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/campaign",
    body: campaignInputSchema,
    responses: {
      201: campaignSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/campaign/:id",
    body: campaignInputSchema,
    responses: {
      200: campaignSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/campaign",
    responses: {
      200: z.array(campaignSchema),
    },
  },
  getByID: {
    method: "GET",
    path: "/campaign/:id",
    responses: {
      200: campaignSchema,
    },
  },
});
