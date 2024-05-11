import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import { Contact, ContactInput } from "../../../models/contact";
import { APIError } from "../../../config/api_error";

const client = initClient(contract, {
  baseUrl: `${root}/contact`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class ContactRepo {
  async createNew(data: ContactInput): Promise<Contact> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while create your contact.",
      result.status,
    );
  }

  async getAll(): Promise<Contact[]> {
    const result = await client.getAll();
    if (result.status === 200) return result.body;

    throw new APIError(
      "An error happened while fetching contacts.",
      result.status,
    );
  }
}
