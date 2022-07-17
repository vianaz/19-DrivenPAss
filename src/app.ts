import { errorHandlerMiddleware } from "@middlewares/ErrorHandlerMiddleware";
import express, { Application } from "express";
import "express-async-errors";
import { AuthRouter } from "routers/AuthRouter";

export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.middlewares();

    new AuthRouter(this.app);
    this.app.use(errorHandlerMiddleware);
  }

  private middlewares() {
    this.app.use(express.json());
  }
}
