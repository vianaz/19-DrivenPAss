import { Note } from "@interfaces/interfaces";
import { InsertNoteServices } from "@services/SafetyNoteServices";
import { Request, Response } from "express";

export class SafetyNoteController {
  insertSafetyNote = async (req: Request<Note, Note, Note>, res: Response) => {
    const insertCredentialService = new InsertNoteServices();
    const { user } = req as any;
    const noteInfo = req.body;

    const { noteId } = await insertCredentialService.insertNote(user, noteInfo);

    res.status(201).send({ noteId });
    res.send("insertSafetyNote");
  };
  getSafetyNote = async (req: Request, res: Response) => {
    res.send("getSafetyNote");
  };
  deleteSafetyNote = async (req: Request, res: Response) => {
    res.send("deleteSafetyNote");
  };
}