import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class GetDataAllFactory {
  public query: any;
  constructor(type: TableTypes) {
    if (type === "card") this.getAllCard();
    else if (type === "credential") this.getAllCredential();
    else if (type === "note") this.GetAllSafetyNote();
    else if (type === "wifi") this.getAllWifi();
  }

  getAllCard = () => {
    this.query = prisma.cards.findMany;
  };
  getAllCredential = () => {
    this.query = prisma.credentials.findMany;
  };
  GetAllSafetyNote = () => {
    this.query = prisma.safetyNotes.findMany;
  };
  getAllWifi = () => {
    this.query = prisma.wifis.findMany;
  };
}
