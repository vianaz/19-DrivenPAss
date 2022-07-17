import { User } from "@interfaces/interfaces";
import { prisma } from "db/database";

export class UserRepository {
  insertUser = async (user: User) => {
    return await prisma.users.create({ data: user });
  };
  getUserByEmail = async (email: string) => {
    return await prisma.users.findUnique({ where: { email } });
  };
}
