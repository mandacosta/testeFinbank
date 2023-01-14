import { NextFunction, Request, Response } from "express";
import AppError from "../../errors/AppError";

const ensureAdmOwnerAuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const reqId = req.params.id;

  if (req.user.adm || reqId === req.user.id) {
    return next();
  }
  throw new AppError("Requires Admin or Owner permission", 403);
};

export default ensureAdmOwnerAuthMiddleware;
