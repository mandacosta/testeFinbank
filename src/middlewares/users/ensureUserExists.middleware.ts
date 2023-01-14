import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { validate } from "uuid";

const ensureUserExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;

  const userRepo = AppDataSource.getRepository(User);

  const uuidValid = await validate(id);

  if (!uuidValid) {
    throw new AppError("User not found", 404);
  }

  const exists = await userRepo.exist({
    where: {
      id: id,
    },
    withDeleted: true,
  });

  if (!exists) {
    throw new AppError("User not found", 404);
  }

  next();
};

export default ensureUserExistsMiddleware;
