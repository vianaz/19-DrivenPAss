import { errorHandlerMiddleware } from "@middlewares/errorHandlerMiddleware";
import { tokenMiddleware } from "@middlewares/tokenMiddleware";
import express, { Application } from "express";
import "express-async-errors";
import { AuthRouter } from "routers/AuthRouter";
import { CrendentialRouter } from "routers/CredentialRouter";

export class App {
  public app: Application;

  constructor() {
    const { middlewares, buildRouters } = this;
    this.app = express();

    middlewares();
    buildRouters();

    this.app.use(errorHandlerMiddleware);
  }

  private middlewares = () => {
    const { app } = this;

    app.use(express.json());

    app.use("/credential", tokenMiddleware);
  };

  private buildRouters = () => {
    const { app } = this;

    new AuthRouter(app);
    new CrendentialRouter(app);
  };
}
