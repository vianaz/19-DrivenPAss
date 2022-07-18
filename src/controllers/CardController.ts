import { Card } from "@interfaces/interfaces";
import {
  DeleteCardServices,
  GetCardServices,
  InsertCardService,
} from "@services/CardServices";
import { Request, Response } from "express";

export class CardController {
  insertCard = async (req: Request<Card, Card, Card>, res: Response) => {
    const insertCardService = new InsertCardService();
    const { user } = req as any;
    const cardInfo = req.body;

    const { cardId } = await insertCardService.insertCard(user, cardInfo);

    res.status(201).send({ cardId });
  };
  getCard = async (req: Request, res: Response) => {
    const getCardService = new GetCardServices();

    const { id } = req.params;
    const { user } = req as any;

    const card = await getCardService.getWifi(user.id, id);

    res.send(card);
  };
  deleteCard = async (req: Request, res: Response) => {
    const deleteNotesService = new DeleteCardServices();
    const { id: cardId } = req.params;

    await deleteNotesService.deleteCard(cardId);

    res.send("Card deleted");
  };
}
