import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { campaignInputSchema, campaignSchema } from "../../../models/campaign";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/",
    body: campaignInputSchema,
    responses: {
      201: campaignSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/:id",
    body: campaignInputSchema,
    responses: {
      200: campaignSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/",
    responses: {
      200: z.array(campaignSchema),
    },
  },
  getByID: {
    method: "GET",
    path: "/:id",
    responses: {
      200: campaignSchema,
    },
  },
});
