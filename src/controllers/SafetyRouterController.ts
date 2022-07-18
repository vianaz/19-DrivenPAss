import { Request, Response } from "express";

export class SafetyNoteController {
  insertSafetyNote = async (req: Request, res: Response) => {
    res.send("insertSafetyNote");
  };
  getSafetyNote = async (req: Request, res: Response) => {
    res.send("getSafetyNote");
  };
  deleteSafetyNote = async (req: Request, res: Response) => {
    res.send("deleteSafetyNote");
  };
}
