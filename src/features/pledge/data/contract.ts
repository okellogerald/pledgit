import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { pledgeInputSchema, pledgeSchema } from "../../../models/pledge";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/",
    body: pledgeInputSchema,
    responses: {
      201: pledgeSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/:id",
    body: pledgeInputSchema,
    responses: {
      200: pledgeSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/",
    responses: {
      200: z.array(pledgeSchema),
    },
  },
  getByID: {
    method: "GET",
    path: "/:id",
    responses: {
      200: pledgeSchema,
    },
  },
});
