import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import { APIError } from "../../../config/api_error";
import { Pledge, PledgeEditInput, PledgeInput } from "@/models/pledge";

const client = initClient(contract, {
  baseUrl: `${root}/pledge`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class PledgeRepo {
  async createNew(data: PledgeInput): Promise<PledgeInput> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while recording the pledge",
      result.status,
    );
  }

  async getAll(): Promise<Pledge[]> {
    const response = await client.getAll();
    if (response.status === 200) return response.body.results;

    throw new APIError(
      "An error happened while fetching pledges",
      response.status,
    );
  }

  async edit(data: PledgeEditInput): Promise<PledgeInput> {
    const { pledgeId, ...rest } = data;

    const result = await client.update({
      params: { id: pledgeId },
      body: rest,
    });
    if (result.status === 200) {
      return result.body;
    }

    throw new APIError(
      "An error happened while editing pledge info",
      result.status,
    );
  }
}
