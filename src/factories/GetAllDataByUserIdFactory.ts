import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class GetDataAllFactory {
  public query: any;
  constructor(type: TableTypes) {
    if (type === "cards") this.getAllCard();
    else if (type === "credentials") this.getAllCredential();
    else if (type === "safetyNotes") this.GetAllSafetyNote();
    else if (type === "wifis") this.getAllWifi();
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
