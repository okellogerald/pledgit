import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { pledgeInputSchema, pledgeSchema } from "../../../models/pledge";

const c = initContract();

const constantQuery = "eager=[contact,campaign]";

export const contract = c.router({
  create: {
    method: "POST",
    path: "/",
    body: pledgeInputSchema,
    responses: {
      201: pledgeInputSchema,
    },
  },
  update: {
    method: "PATCH",
    path: `/:id`,
    body: pledgeInputSchema,
    responses: {
      200: pledgeInputSchema,
    },
  },
  getAll: {
    method: "GET",
    path: `?${constantQuery}`,
    responses: {
      200: z.object({ results: z.array(pledgeSchema) }),
    },
  },
  getByID: {
    method: "GET",
    path: `/:id/?${constantQuery}`,
    responses: {
      200: pledgeSchema,
    },
  },
});
