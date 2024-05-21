import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import { APIError } from "../../../config/api_error";
import {
  Payment,
  PaymentEditInput,
  PaymentInput,
} from "../../../models/payment";

const client = initClient(contract, {
  baseUrl: `${root}/payment`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class PaymentsRepo {
  async createNew(data: PaymentInput): Promise<Payment> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while recording the payment",
      result.status,
    );
  }

  async getAll(): Promise<Payment[]> {
    const response = await client.getAll();
    if (response.status === 200) return response.body.results;

    throw new APIError(
      "An error happened while fetching payments",
      response.status,
    );
  }
  async edit(data: PaymentEditInput): Promise<Payment> {
    const { paymentId, ...rest } = data;

    const result = await client.update({
      params: { id: paymentId },
      body: rest,
    });
    if (result.status === 200) {
      return result.body;
    }

    throw new APIError(
      "An error happened while editing payment info",
      result.status,
    );
  }
}
