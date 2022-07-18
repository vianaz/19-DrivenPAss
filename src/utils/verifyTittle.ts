import { CredentialRepository } from "@repositories/CredentialRepository";

export const verifyTitle = async (id: string, title: string) => {
  const credentialRepository = new CredentialRepository();

  const thisTittleOfUserAlreadyExists = (
    await credentialRepository.getCredentialByType(id, title)
  )?.credentials[0];

  return !!thisTittleOfUserAlreadyExists;
};
