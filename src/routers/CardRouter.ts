import { CardController } from "@controllers/CardController";
import { Application } from "express";

export class CardRouter {
  constructor(app: Application) {
    const cardController = new CardController();

    app.post("/card", cardController.insertCard);
    app.get("/card/:id?", cardController.getCard);
    app.delete("/card/:id", cardController.deleteCard);
  }
}
