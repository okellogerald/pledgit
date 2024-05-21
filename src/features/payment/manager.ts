import { PaymentsRepo } from "./data/repo";
import { Payment, PaymentEditInput, PaymentInput } from "@/models/payment";
import { paymentsStateStore } from "./store";

export class PaymentsManager {
  private static _instance: PaymentsManager;

  private constructor() {
    //
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private get repo() {
    return new PaymentsRepo();
  }

  async getAll(): Promise<Payment[]> {
    const list = await this.repo.getAll();
    paymentsStateStore.getState().setPayments(list);
    return list;
  }

  async add(data: PaymentInput): Promise<Payment> {
    return await this.repo.createNew(data);
  }

  async edit(data: PaymentEditInput): Promise<Payment> {
    return await this.repo.edit(data);
  }
}
