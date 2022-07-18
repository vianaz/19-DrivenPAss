import { TableTypes } from "@interfaces/interfaces";
import { CredentialRepository } from "@repositories/IndexRepository";

export const verifyTitle = async (
  id: string,
  title: string,
  type: TableTypes,
) => {
  const credentialRepository = new CredentialRepository();

  const thisTittleOfUserAlreadyExists = (
    await credentialRepository.getDataByTitle(id, title, type)
  )[type][0];

  return !!thisTittleOfUserAlreadyExists;
};
