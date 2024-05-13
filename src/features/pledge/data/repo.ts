import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import { APIError } from "../../../config/api_error";
import { Pledge, PledgeInput } from "@/models/pledge";

const client = initClient(contract, {
  baseUrl: `${root}/pledge`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class PledgeRepo {
  async createNew(data: PledgeInput): Promise<Pledge> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while recording the payment.",
      result.status,
    );
  }

  async getAll(): Promise<Pledge[]> {
    const result = await client.getAll();
    if (result.status === 200) return result.body;

    throw new APIError(
      "An error happened while fetching payments.",
      result.status,
    );
  }
}
