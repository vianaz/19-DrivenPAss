import { SafetyNoteController } from "@controllers/SafetyController";
import { Application } from "express";

export class SafetyNoteRouter {
  constructor(app: Application) {
    const safetyNoteController = new SafetyNoteController();

    app.post("/notes", safetyNoteController.insertSafetyNote);
    app.get("/notes/:id?", safetyNoteController.getSafetyNote);
    app.delete("/notes/:id", safetyNoteController.deleteSafetyNote);
  }
}
