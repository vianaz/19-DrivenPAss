import { Card } from "@interfaces/interfaces";
import { Cards, Wifis } from "@prisma/client";
import { CredentialRepository } from "@repositories/IndexRepository";
import { CryptUtils } from "@utils/cryptUtils";
import { errorFactory } from "@utils/errorFactory";
import { verifyTitle } from "@utils/verifyTittle";

export class InsertCardService {
  insertCard = async (user: any, card: Card) => {
    const indexRepository = new CredentialRepository();

    const { id } = user;
    const formatedCard = Object.assign(card, {
      userId: id,
    }) as unknown;

    const tittleArealdyUsed = await verifyTitle(id, card.title, "cards");

    if (tittleArealdyUsed) throw errorFactory("error_title_already_used");

    const cardDataEncrypted = this.handlerDataCardEncrypt(
      formatedCard as Cards,
    );

    const { id: cardId } = await indexRepository.insertData(
      cardDataEncrypted,
      "cards",
    );

    return { cardId };
  };
  private handlerDataCardEncrypt = (card: Cards): Cards => {
    const cryptr = new CryptUtils();
    let { password, cvv } = card;

    password = cryptr.encrypt(password);
    cvv = cryptr.encrypt(cvv);

    return { ...card, password, cvv };
  };
}

export class GetCardServices {
  getWifi = async (userId: string, cardId?: string) => {
    const indexRepository = new CredentialRepository();

    if (cardId) {
      const card = (await indexRepository.getDataById(
        cardId,
        "cards",
      )) as Cards;

      return this.handlerDataCardDecrypt(card);
    }

    const card = await indexRepository.getAllDataByUserId(userId, "cards");
    return this.handlerDataCardDecrypt(card);
  };

  private handlerDataCardDecrypt = (card: Cards | Cards[]) => {
    const cryptr = new CryptUtils();

    if (Array.isArray(card)) {
      const teste = card.map((card) => {
        return {
          ...card,
          password: cryptr.decrypt(card.password),
          cvv: cryptr.decrypt(card.cvv),
        };
      });
      return teste;
    }

    return {
      ...card,
      password: cryptr.decrypt(card.password),
      cvv: cryptr.decrypt(card.cvv),
    };
  };
}

export class DeleteCardServices {
  deleteCard = async (cardId: string) => {
    const credentialRepository = new CredentialRepository();

    await credentialRepository.deleteDataById(cardId, "cards");
  };
}
