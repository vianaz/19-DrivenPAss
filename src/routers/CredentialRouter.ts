import { CredentialController } from "@controllers/CredentialController";
import { Application } from "express";

export class CrendentialRouter {
  constructor(app: Application) {
    const credentialController = new CredentialController();

    app.post("/credential", credentialController.insertCredential);
    app.get("/credential/:id?", credentialController.getCredential);
    app.delete("/credential/:id?", credentialController.deleteCredential);
  }
}
