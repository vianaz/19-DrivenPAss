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

    const credentialDataWithPasswordEncrypted = this.handlerDataSignUpEncrypt(
      formatedCredential as Credentials,
    );

    credentialRepository.insertCredential(credentialDataWithPasswordEncrypted);
  };
  handlerDataSignUpEncrypt = (credential: Credentials): Credentials => {
    const cryptr = new CryptUtils();
    let { password } = credential;

    password = cryptr.encrypt(password);

    return { ...credential, password };
  };
}
