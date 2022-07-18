import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class GetDataByTittleFactory {
  public query: any;
  constructor(id: string, tittle: string, type: TableTypes) {
    if (type === "cards") this.getCard(id, tittle);
    else if (type === "credentials") this.getCredential(id, tittle);
    else if (type === "safetyNotes") this.getSafetyNote(id, tittle);
    else if (type === "wifis") this.getWifi(id, tittle);
  }

  getCard = (id: string, title: string) => {
    this.query = {
      where: { id },
      select: { cards: { where: { title } } },
    };
  };
  getCredential = (id: string, title: string) => {
    this.query = {
      where: { id },
      select: { credentials: { where: { title } } },
    };
  };
  getSafetyNote = (id: string, title: string) => {
    this.query = {
      where: { id },
      select: { safetyNotes: { where: { title } } },
    };
  };
  getWifi = (id: string, title: string) => {
    this.query = {
      where: { id },
      select: { wifis: { where: { title } } },
    };
  };
}
