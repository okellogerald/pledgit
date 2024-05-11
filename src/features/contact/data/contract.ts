import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { contactInputSchema, contactSchema } from "../../../models/contact";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/",
    body: contactInputSchema,
    responses: {
      201: contactSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/:id",
    body: z.object({
      reference: z.string().optional(),
      firstName: z.string(),
      lastName: z.string(),
      phone: z.string(),
    }),
    responses: {
      200: contactSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/",
    responses: {
      200: z.array(contactSchema),
    },
  },
  getByID: {
    method: "GET",
    path: "/:id",
    responses: {
      200: contactSchema,
    },
  },
});
