import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class DeleteDataByIdFactory {
  public query: any;
  constructor(type: TableTypes) {
    if (type === "card") this.deleteCard();
    else if (type === "credential") this.deleteCredential();
    else if (type === "note") this.deleteSafetyNote();
    else if (type === "wifi") this.deleteWifi();
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
