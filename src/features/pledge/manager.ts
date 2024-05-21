import { PledgeRepo } from "./data/repo";
import { Pledge, PledgeEditInput, PledgeInput } from "@/models/pledge";
import { pledgesStateStore } from "./store";

export class PledgesManager {
  private static _instance: PledgesManager;

  private constructor() {
    //
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private get repo() {
    return new PledgeRepo();
  }

  async getAll(): Promise<Pledge[]> {
    const list = await this.repo.getAll();
    pledgesStateStore.getState().setPledges(list);
    return list;
  }

  async add(data: PledgeInput): Promise<Pledge> {
    return await this.repo.createNew(data);
  }

  async edit(data: PledgeEditInput): Promise<Pledge> {
    return await this.repo.edit(data);
  }
}
