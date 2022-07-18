import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class GetDataByIdFactory {
  public query: any;
  constructor(type: TableTypes) {
    if (type === "card") this.getCard();
    else if (type === "credential") this.getCredential();
    else if (type === "note") this.getSafetyNote();
    else if (type === "wifi") this.getWifi();
  }

  getCard = () => {
    this.query = prisma.cards.findUnique;
  };
  getCredential = () => {
    this.query = prisma.credentials.findUnique;
  };
  getSafetyNote = () => {
    this.query = prisma.safetyNotes.findUnique;
  };
  getWifi = () => {
    this.query = prisma.wifis.findUnique;
  };
}
