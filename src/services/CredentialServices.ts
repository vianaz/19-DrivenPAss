import { Credential } from "@interfaces/interfaces";
import { Credentials } from "@prisma/client";
import { CredentialRepository } from "@repositories/CredentialRepository";
import { CryptUtils } from "@utils/cryptUtils";
import { errorFactory } from "@utils/errorFactory";
import { verifyTitle } from "@utils/verifyTittle";

export class insertCredentialServices {
  insertCredential = async (user: any, credential: Credential) => {
    const credentialRepository = new CredentialRepository();

    const { id } = user;
    const formatedCredential = Object.assign(credential, {
      userId: id,
    }) as unknown;

    const tittleArealdyUsed = await verifyTitle(id, credential.title);

    if (tittleArealdyUsed) throw errorFactory("error_title_already_used");

    const credentialDataWithPasswordEncrypted =
      this.handlerDataCredentialEncrypt(formatedCredential as Credentials);

    const { id: cretendialId } = await credentialRepository.insertCredential(
      credentialDataWithPasswordEncrypted,
    );

    return { cretendialId };
  };
  handlerDataCredentialEncrypt = (credential: Credentials): Credentials => {
    const cryptr = new CryptUtils();
    let { password } = credential;

    password = cryptr.encrypt(password);

    return { ...credential, password };
  };
}

export class GetCredentialServices {
  getCredential = async (userId: string, credentialId?: string) => {
    const credentialRepository = new CredentialRepository();
    if (credentialId) {
      const cretendial = (await credentialRepository.getCredentialById(
        credentialId,
      )) as Credentials;

      return this.handlerDataCredentialDecrypt(cretendial);
    }

    const cretendial = await credentialRepository.getAllCredentials(userId);
    return this.handlerDataCredentialDecrypt(cretendial);
  };

  handlerDataCredentialDecrypt = (credential: Credentials | Credential[]) => {
    const cryptr = new CryptUtils();

    if (Array.isArray(credential)) {
      const teste = credential.map((credential) => {
        return {
          ...credential,
          password: cryptr.decrypt(credential.password),
        };
      });
      return teste;
    }

    return { ...credential, password: cryptr.decrypt(credential.password) };
  };
}

export class DeleteCredentialServices {
  deleteCredential = async (credentialId: string) => {
    const credentialRepository = new CredentialRepository();

    await credentialRepository.deleteCredentialById(credentialId);
  };
}
