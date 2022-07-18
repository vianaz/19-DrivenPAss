import { Credentials, Users } from "@prisma/client";

export type User = Omit<Users, "id" | "createdAt">;
export type Error = {
  statusCode: number;
  message: string;
};
export type Credential = Omit<Credentials, "id" | "userId">