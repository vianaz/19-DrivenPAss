import express, { Application } from "express";

export class App {
  public app: Application;
        
  constructor() {
    this.app = express();
    this.routes();
  }

  routes() {
    this.app.get("/", (req, res) => {
      res.send("Hello World");
    });
  }
}
