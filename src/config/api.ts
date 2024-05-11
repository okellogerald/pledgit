import { ApiFetcherArgs } from "@ts-rest/core";
import axios, { AxiosError, AxiosResponse, isAxiosError, Method } from "axios";
import { v4 as uuidv4 } from 'uuid';

export const root = "https://webhook.temboplus.com/pledgit"

export const baseHeaders = {
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Access-Control-Allow-Origin": "*",
};

export async function BaseAPI(args: ApiFetcherArgs) {
  const headers = args.headers ?? {};
  headers["token"] = localStorage.getItem("token") ?? "";
  headers["x-request-id"] = uuidv4();

  try {
    const result = await axios.request({
      method: args.method as Method,
      url: `${args.path}`,
      headers: headers,
      data: args.body,
    });
    return {
      status: result.status,
      body: result.data,
      headers: result.headers,
    };
  } catch (e: Error | AxiosError | any) {
    if (isAxiosError(e)) {
      const error = e as AxiosError;
      const response = error.response as AxiosResponse;
      const headers: any = response.headers;

      if (error.response?.status === 401) {
        // router.push(LOGIN_PAGE_PATH);
        throw "Unauthorized";
      }

      return {
        status: response.status,
        body: response.data,
        headers: headers,
      };
    }

    throw e;
  }
}
