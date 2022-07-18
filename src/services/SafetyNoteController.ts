import { CredentialRepository } from "@repositories/IndexRepository";

export class InserNoteService {
  inserNote(data: any, userId: string) {
    const credentialRepository = new CredentialRepository();

    

    return credentialRepository.insertData(data, "note");
  }
}
