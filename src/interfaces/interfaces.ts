import { Users } from "@prisma/client";

export type User = Omit<Users, "id" | "createdAt">;
export type Error = {
  statusCode: number;
  message: string;
};
