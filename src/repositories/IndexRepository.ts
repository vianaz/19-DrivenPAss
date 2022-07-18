import { TableTypes } from "@interfaces/interfaces";
import { prisma } from "db/database";
import { DeleteDataByIdFactory } from "factories/DeleteDataByIdFactory";
import { GetDataAllFactory } from "factories/GetAllDataByUserIdFactory";
import { GetDataByIdFactory } from "factories/GetDataByIdFactory";
import { GetDataByTittleFactory } from "factories/GetDataByTittleFactory";
import { InsertDataFactory } from "factories/InserDataFactory";

export class CredentialRepository {
  async getCredentialByType(id: string, title?: string): Promise<any> {
    const { query } = new CredentialQueryFactory(id, title);

    return await prisma.users.findUnique(query);
  }

  async getDataByTitle(id: string, title: string, type: TableTypes) {
    const { query } = new GetDataByTittleFactory(id, title, type);
    return (await prisma.users.findUnique(query)) as any;
  }

  async insertData(data: any, type: TableTypes) {
    const { query } = new InsertDataFactory(type);
    return await query({ data });
  }

  async getAllDataByUserId(userId: string, type: TableTypes) {
    const { query } = new GetDataAllFactory(type);
    return await query({ where: { userId } });
  }

  async getDataById(id: string, type: TableTypes) {
    const { query } = new GetDataByIdFactory(type);
    return await query({
      where: { id },
    });
  }

  async deleteDataById(id: string, type: TableTypes) {
    const { query } = new DeleteDataByIdFactory(type);
    return await query({
      where: { id },
    });
  }
}

class CredentialQueryFactory {
  public query: any;

  constructor(id: string, title?: string) {
    if (title) this.getCredentialByTitle(id, title);
    else if (id) this.getByUserId(id);
  }

  getByUserId(id: string) {
    this.query = { where: { id } };
  }

  getCredentialByTitle = (id: string, title: string) => {
    this.query = {
      where: { id },
      include: { credentials: { where: { title } } },
    };
  };
}
