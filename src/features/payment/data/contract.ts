import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { paymentInputSchema, paymentSchema } from "../../../models/payment";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/payment",
    body: paymentInputSchema,
    responses: {
      201: paymentSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/payment/:id",
    body: paymentInputSchema,
    responses: {
      200: paymentSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/payment",
    responses: {
      200: z.array(paymentSchema),
    },
  },
  getByID: {
    method: "GET",
    path: "/payment/:id",
    responses: {
      200: paymentSchema,
    },
  },
});
