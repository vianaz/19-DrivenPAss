import { Cards, Credentials, SafetyNotes, Users, Wifis } from "@prisma/client";

export type User = Omit<Users, "id" | "createdAt">;
export type Error = {
  statusCode: number;
  message: string;
};
export type Credential = Omit<Credentials, "id" | "userId">;
export type Note = Omit<SafetyNotes, "id" | "userId">;
export type Card = Omit<Cards, "id" | "userId">;
export type Wifi = Omit<Wifis, "id" | "userId">;
export type TableTypes = "credentials" | "safetyNotes" | "wifis" | "cards";
export type TittleReturnTypes =
  | {
      credentials: Credentials[];
    }
  | {
      safetyNotes: SafetyNotes[];
    }
  | { wifi: Wifis[] }
  | { cards: Cards[] };
