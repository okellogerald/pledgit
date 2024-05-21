import { z } from "zod";
import { initContract } from "@ts-rest/core";
import { paymentInputSchema, paymentSchema } from "../../../models/payment";

const c = initContract();

export const contract = c.router({
  create: {
    method: "POST",
    path: "/",
    body: paymentInputSchema,
    responses: {
      201: paymentSchema,
    },
  },
  update: {
    method: "PATCH",
    path: "/:id",
    body: paymentInputSchema,
    responses: {
      200: paymentSchema,
    },
  },
  getAll: {
    method: "GET",
    path: "/?eager=[contact,campaign,pledge]",
    responses: {
      200: z.object({ results: z.array(paymentSchema) }),
    },
  },
  getByID: {
    method: "GET",
    path: "/:id",
    responses: {
      200: paymentSchema,
    },
  },
});
