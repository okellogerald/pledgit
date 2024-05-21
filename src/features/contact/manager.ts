import { ContactRepo } from "./data/repo";
import { Contact, ContactEditInput, ContactInput } from "@/models/contact";
import { contactsStateStore } from "./store";

export class ContactManager {
  private static _instance: ContactManager;

  private constructor() {
    //
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  private get repo() {
    return new ContactRepo();
  }

  async getAll(): Promise<Contact[]> {
    const list = await this.repo.getAll();
    contactsStateStore.getState().setContacts(list);
    return list;
  }

  async add(data: ContactInput): Promise<Contact> {
    return await this.repo.createNew(data);
  }

  async edit(data: ContactEditInput): Promise<Contact> {
    return await this.repo.edit(data);
  }
}
