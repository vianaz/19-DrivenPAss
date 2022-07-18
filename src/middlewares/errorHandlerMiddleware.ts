import { Error } from "@interfaces/interfaces";
import { NextFunction, Request, Response } from "express";

export const errorHandlerMiddleware = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  
  return res.status(err.statusCode).send(err.message);
};
