import { initClient } from "@ts-rest/core";
import { contract } from "./contract";
import { BaseAPI, baseHeaders, root } from "../../../config/api";
import {
  Contact,
  ContactEditInput,
  ContactInput,
} from "../../../models/contact";
import { APIError } from "../../../config/api_error";

const client = initClient(contract, {
  baseUrl: `${root}/contact`,
  baseHeaders: baseHeaders,
  api: BaseAPI,
});

export class ContactRepo {
  async getAll(): Promise<Contact[]> {
    const response = await client.getAll();
    if (response.status === 200) return response.body.results;

    throw new APIError(
      "An error happened while fetching contacts",
      response.status,
    );
  }

  async createNew(data: ContactInput): Promise<Contact> {
    const result = await client.create({ body: data });
    if (result.status === 201) {
      return result.body;
    }

    throw new APIError(
      "An error happened while create your contact",
      result.status,
    );
  }

  async edit(data: ContactEditInput): Promise<Contact> {
    const { contactId, ...rest } = data;

    const result = await client.update({
      params: { id: contactId },
      body: rest,
    });
    if (result.status === 200) {
      return result.body;
    }

    throw new APIError(
      "An error happened while editing contact info",
      result.status,
    );
  }
}
