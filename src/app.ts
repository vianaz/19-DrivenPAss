import { errorHandlerMiddleware } from "@middlewares/errorHandlerMiddleware";
import { tokenMiddleware } from "@middlewares/tokenMiddleware";
import express, { Application } from "express";
import "express-async-errors";
import { AuthRouter } from "routers/AuthRouter";
import { CrendentialRouter } from "routers/CredentialRouter";
import { SafetyNoteRouter } from "routers/SafetyNoteRouter";
import { WifiRouter } from "routers/WifiRouter";

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
    app.use("/notes", tokenMiddleware);
    app.use("/card", tokenMiddleware);
    app.use("/wifi", tokenMiddleware);
  };

  private buildRouters = () => {
    const { app } = this;

    new AuthRouter(app);
    new CrendentialRouter(app);
    new SafetyNoteRouter(app);
    new WifiRouter(app);
  };
}
