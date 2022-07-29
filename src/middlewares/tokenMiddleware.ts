import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export const tokenMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = (
    (req.headers["x-access-token"] as string) ||
    (req.headers["authorization"] as string)
  ).split(" ")[1];

  if (!token) {
    return res.status(401).send("No token provided");
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid token");
    }

    req.user = decoded;
    next();
  });
};
