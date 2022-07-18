import { User } from "@interfaces/interfaces";
import { SignInServices, SignUpServices } from "@services/AuthServices";
import { Request, Response } from "express";

export class AuthController {
  // ? Sign Up
  signUp = async (req: Request<User, User, User>, res: Response) => {
    const signUpService = new SignUpServices();

    const signUpData = req.body;

    await signUpService.insertUser(signUpData);

    res.status(201).send("You are signed up");
  };

  // ? Sign in
  signIn = async (req: Request<User, User, User>, res: Response) => {
    const signInService = new SignInServices();
    const { email, password } = req.body;

    const token = await signInService.signIn(email, password);

    res.status(200).send(token);
  };
}
