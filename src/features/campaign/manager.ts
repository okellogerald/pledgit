import { Campaign, CampaignEditInput, CampaignInput } from "@/models/campaign";
import { ContactRepo } from "./data/repo";
import { campaignsStateStore } from "./store";

export class CampaignManager {
  private static _instance: CampaignManager;

  private constructor() {
    //
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private get repo() {
    return new ContactRepo();
  }

  async getAll(): Promise<Campaign[]> {
    const list = await this.repo.getAll();
    campaignsStateStore.getState().setCampaigns(list);
    return list;
  }

  async add(data: CampaignInput): Promise<Campaign> {
    return await this.repo.createNew(data);
  }

  async edit(data: CampaignEditInput): Promise<Campaign> {
    return await this.repo.edit(data);
  }
}
