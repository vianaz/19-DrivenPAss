import { Note } from "@interfaces/interfaces";
import { SafetyNotes } from "@prisma/client";
import { CredentialRepository } from "@repositories/IndexRepository";
import { errorFactory } from "@utils/errorFactory";
import { verifyTitle } from "@utils/verifyTittle";

export class InsertNoteServices {
  insertNote = async (user: any, note: Note) => {
    const indexRepository = new CredentialRepository();

    const { id } = user;
    const formatedNote = Object.assign(note, {
      userId: id,
    }) as unknown;

    const tittleArealdyUsed = await verifyTitle(id, note.title, "safetyNotes");

    if (tittleArealdyUsed) throw errorFactory("error_title_already_used");

    const { id: noteId } = await indexRepository.insertData(
      formatedNote,
      "safetyNotes",
    );

    return { noteId };
  };
}

export class GetNotesServices {
  getNote = async (userId: string, noteId?: string) => {
    const credentialRepository = new CredentialRepository();

    if (noteId) {
      const cretendial = (await credentialRepository.getDataById(
        noteId,
        "safetyNotes",
      )) as SafetyNotes;

      return cretendial;
    }

    const cretendial = await credentialRepository.getAllDataByUserId(
      userId,
      "safetyNotes",
    );
    return cretendial;
  };
}

export class DeleteNotesServices {
  deleteNote = async (noteId: string) => {
    const indexRepository = new CredentialRepository();

    await indexRepository.deleteDataById(noteId, "safetyNotes");
  };
}
