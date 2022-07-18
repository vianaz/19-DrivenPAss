import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class DeleteDataByIdFactory {
  public query: any;
  constructor(type: TableTypes) {
    if (type === "cards") this.deleteCard();
    else if (type === "credentials") this.deleteCredential();
    else if (type === "safetyNotes") this.deleteSafetyNote();
    else if (type === "wifis") this.deleteWifi();
  }

  deleteCard = () => {
    this.query = prisma.cards.delete;
  };
  deleteCredential = () => {
    this.query = prisma.credentials.delete;
  };
  deleteSafetyNote = () => {
    this.query = prisma.safetyNotes.delete;
  };
  deleteWifi = () => {
    this.query = prisma.wifis.delete;
  };
}
