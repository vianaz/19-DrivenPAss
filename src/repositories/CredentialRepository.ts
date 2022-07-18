import { Credentials } from "@prisma/client";
import { prisma } from "db/database";

export class CredentialRepository {
  async getCredentialByType(id: string, title?: string): Promise<any> {
    const query = new CredentialQueryFactory(id, title).query;

    return await prisma.users.findUnique(query);
  }

  async insertCredential(credential: Credentials) {
    await prisma.credentials.create({ data: credential });
  }

  async getAllCredentials(id: string) {
    return await prisma.credentials.findMany({
      where: { userId: id },
    });
  }
}

class CredentialQueryFactory {
  public query: any;

  constructor(id: string, title?: string) {
    if (title) this.getByTitle(id, title);
    else if (id) this.getByUserId(id);
  }

  getByUserId(id: string) {
    this.query = { where: { id } };
  }

  getByTitle = (id: string, title: string) => {
    this.query = {
      where: { id },
      include: { credentials: { where: { title } } },
    };
  };
}
