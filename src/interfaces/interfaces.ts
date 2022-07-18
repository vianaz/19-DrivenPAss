import { Credentials, SafetyNotes, Users } from "@prisma/client";

export type User = Omit<Users, "id" | "createdAt">;
export type Error = {
  statusCode: number;
  message: string;
};
export type Credential = Omit<Credentials, "id" | "userId">;
export type SafetyNote = Omit<SafetyNotes, "id" | "userId">;
export type TableTypes = "credential" | "note" | "wifi" | "card";
