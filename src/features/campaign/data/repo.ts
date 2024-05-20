import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import { APIError } from "../../../config/api_error";
import {
  Campaign,
  CampaignEditInput,
  CampaignInput,
} from "../../../models/campaign";

const client = initClient(contract, {
  baseUrl: `${root}/campaign`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class ContactRepo {
  async getAll(): Promise<Campaign[]> {
    const result = await client.getAll();
    if (result.status === 200) return result.body.results;

    throw new APIError(
      "An error happened while fetching contacts.",
      result.status,
    );
  }

  async createNew(data: CampaignInput): Promise<Campaign> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while creating a new campaign",
      result.status,
    );
  }

  async edit(data: CampaignEditInput): Promise<Campaign> {
    const { campaignId, ...rest } = data;
    
    const result = await client.update({
      params: { id: campaignId },
      body: rest,
    });
    if (result.status === 200) {
      return result.body;
    }

    throw new APIError(
      "An error happened while editing campaign info",
      result.status,
    );
  }
}
