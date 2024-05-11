import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { pledgeInputSchema, pledgeSchema } from "../../../models/pledge";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/pledge",
    body: pledgeInputSchema,
    responses: {
      201: pledgeSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/pledge/:id",
    body: pledgeInputSchema,
    responses: {
      200: pledgeSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/pledge",
    responses: {
      200: z.array(pledgeSchema),
    },
  },
  getByID: {
    method: "GET",
    path: "/pledge/:id",
    responses: {
      200: pledgeSchema,
    },
  },
});
