import Cryptr from "cryptr";

export class CryptUtils {
  private cryptr: Cryptr;

  constructor() {
    this.cryptr = new Cryptr(process.env.SECRET_KEY as string);
  }

  encrypt = (text: string) => {
    return this.cryptr.encrypt(text);
  };
  decrypt = (text: string) => {
    return this.cryptr.decrypt(text);
  };
}
