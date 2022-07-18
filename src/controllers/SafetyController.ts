import { Note } from "@interfaces/interfaces";
import {
  DeleteNotesServices,
  GetNotesServices,
  InsertNoteServices,
} from "@services/SafetyNoteServices";
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
    const getNotesService = new GetNotesServices();

    const { id } = req.params;
    const { user } = req as any;

    const notes = await getNotesService.getNote(user.id, id);

    res.send(notes);
  };
  deleteSafetyNote = async (req: Request, res: Response) => {
    const deleteNotesService = new DeleteNotesServices();
    const { id: cretendialId } = req.params;

    await deleteNotesService.deleteNote(cretendialId);

    res.send("Note deleted");
  };
}
