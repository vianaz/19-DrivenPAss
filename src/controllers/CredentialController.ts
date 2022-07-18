import { Credential } from "@interfaces/interfaces";
import {
  DeleteCredentialServices,
  GetCredentialServices,
  insertCredentialServices,
} from "@services/CredentialServices";
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

    const { cretendialId } = await insertCredentialService.insertCredential(
      user,
      credentials,
    );

    res.status(201).send({ cretendialId });
  };

  // ? Get Credentials / Get Credential
  getCredential = async (req: Request, res: Response) => {
    const getCredentialService = new GetCredentialServices();

    const { id } = req.params;
    const { user } = req as any;

    const credential = await getCredentialService.getCredential(user.id, id);

    res.send(credential);
  };

  // ? Delete Credential
  deleteCredential = async (req: Request, res: Response) => {
    const deleteCredentialService = new DeleteCredentialServices();
    const { id: cretendialId } = req.params;

    await deleteCredentialService.deleteCredential(cretendialId);

    res.send("Credential deleted");
  };
}
