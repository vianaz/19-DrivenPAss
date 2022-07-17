import { AuthController } from "@controllers/AuthController";
import { Application } from "express";

export class AuthRouter {
  constructor(app: Application) {
    const authController = new AuthController();

    app.post("/signin", authController.signIn);
    app.post("/signup", authController.signUp);
  }
}
