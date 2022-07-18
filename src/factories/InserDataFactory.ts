import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class InsertDataFactory {
  public query: any;
  constructor(type: TableTypes) {
    if (type === "cards") this.insertCard();
    else if (type === "credentials") this.insertCredential();
    else if (type === "note") this.insertSafetyNote();
    else if (type === "wifis") this.insertWifi();
  }

  insertCard = () => {
    this.query = prisma.cards.create;
  };
  insertCredential = () => {
    this.query = prisma.credentials.create;
  };
  insertSafetyNote = () => {
    this.query = prisma.safetyNotes.create;
  };
  insertWifi = () => {
    this.query = prisma.wifis.create;
  };
}
