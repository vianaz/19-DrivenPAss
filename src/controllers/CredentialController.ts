import { Credential } from "@interfaces/interfaces";
import { insertCredentialServices } from "@services/CredentialServices";
import { verifyTitle } from "@utils/verifyTittle";
import { Request, Response } from "express";

export class CredentialController {
  // ? Insert Credential
  insertCredential = async (
    req: Request<Credential, Credential, Credential>,
    res: Response,
  ) => {
    const insertCredentialService = new insertCredentialServices();
    const { user } = req as any;
    const credentials = req.body;

    await insertCredentialService.insertCredential(user, credentials);

    res.status(201).send("Credential created");
  };

  // ? Get Credentials / Get Credential
  getCredential = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { user } = req as any;

    
    res.send("Credential");
  };

  // ? Delete Credential
  deleteCredential = async (req: Request, res: Response) => {
    res.send("Credential deleted");
  };
}
