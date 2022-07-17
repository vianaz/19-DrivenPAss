import { User } from "@interfaces/interfaces";
import { SignInServices, SignUpServices } from "@services/AuthServices";
import { Request, Response } from "express";

export class SignUpController {
  private authService: SignUpServices;

  constructor() {
    this.authService = new SignUpServices();
  }
  signUp = async (req: Request<User, User, User>, res: Response) => {
    const { authService } = this;

    const signUpData = req.body;

    await authService.insertUser(signUpData);

    res.status(201).send("You are signed up");
  };
}

export class SignInController {
  private signInService: SignInServices;

  constructor() {
    this.signInService = new SignInServices();
  }
  signIn = async (req: Request<User, User, User>, res: Response) => {
    
    const { signInService } = this;

    const { email, password } = req.body;

    const token = await signInService.signIn(email, password);

    res.status(200).send(token);
  };
}

export class AuthController {
  private signUpController: SignUpController;
  private signInController: SignInController;

  constructor() {
    this.signUpController = new SignUpController();
    this.signInController = new SignInController();
  }
  signUp = async (req: Request<User, User, User>, res: Response) => {
    const { signUpController } = this;

    await signUpController.signUp(req, res);
  };
  signIn = async (req: Request<User, User, User>, res: Response) => {
    const { signInController } = this;

    await signInController.signIn(req, res);
  };
}
