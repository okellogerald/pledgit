import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import { APIError } from "../../../config/api_error";
import { Campaign, CampaignInput } from "../../../models/campaign";

const client = initClient(contract, {
  baseUrl: `${root}/auth`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class ContactRepo {
  async createNew(data: CampaignInput): Promise<Campaign> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while create your contact.",
      result.status,
    );
  }

  async getAll(): Promise<Campaign[]> {
    const result = await client.getAll();
    if (result.status === 200) return result.body;

    throw new APIError(
      "An error happened while fetching contacts.",
      result.status,
    );
  }
}
