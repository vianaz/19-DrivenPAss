import { Wifi } from "@interfaces/interfaces";
import { Wifis } from "@prisma/client";
import { CredentialRepository } from "@repositories/IndexRepository";
import { CryptUtils } from "@utils/cryptUtils";
import { errorFactory } from "@utils/errorFactory";
import { verifyTitle } from "@utils/verifyTittle";

export class InsertWifiServices {
  insertWifi = async (user: any, wifi: Wifi) => {
    const credentialRepository = new CredentialRepository();

    const { id } = user;
    const formatedWifi = Object.assign(wifi, {
      userId: id,
    }) as unknown;

    const tittleArealdyUsed = await verifyTitle(id, wifi.title, "wifis");

    if (tittleArealdyUsed) throw errorFactory("error_title_already_used");

    const credentialDataWithPasswordEncrypted =
      this.handlerDataCredentialEncrypt(formatedWifi as Wifis);

    const { id: wifiId } = await credentialRepository.insertData(
      credentialDataWithPasswordEncrypted,
      "wifis",
    );

    return { wifiId };
  };
  handlerDataCredentialEncrypt = (wifi: Wifis): Wifis => {
    const cryptr = new CryptUtils();
    let { password } = wifi;

    password = cryptr.encrypt(password);

    return { ...wifi, password };
  };
}

export class GetWifiServices {
  getWifi = async (userId: string, wifiId?: string) => {
    const credentialRepository = new CredentialRepository();

    if (wifiId) {
      const wifi = (await credentialRepository.getDataById(
        wifiId,
        "wifis",
      )) as Wifis;

      return this.handlerDataCredentialDecrypt(wifi);
    }

    const wifi = await credentialRepository.getAllDataByUserId(userId, "wifis");
    return this.handlerDataCredentialDecrypt(wifi);
  };

  private handlerDataCredentialDecrypt = (wifi: Wifis | Wifis[]) => {
    const cryptr = new CryptUtils();

    if (Array.isArray(wifi)) {
      const teste = wifi.map((wifi) => {
        return {
          ...wifi,
          password: cryptr.decrypt(wifi.password),
        };
      });
      return teste;
    }

    return { ...wifi, password: cryptr.decrypt(wifi.password) };
  };
}

export class DeleteWifiServices {
  deleteWifi = async (wifiId: string) => {
    const credentialRepository = new CredentialRepository();

    await credentialRepository.deleteDataById(wifiId, "wifis");
  };
}
