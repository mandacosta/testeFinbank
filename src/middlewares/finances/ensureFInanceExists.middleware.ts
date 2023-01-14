import { NextFunction, Request, Response } from "express";
import { validate } from "uuid";
import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";
import AppError from "../../errors/AppError";

const ensureFinanceExistsMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = req.params.id;
  const financeRepository = AppDataSource.getRepository(Finance);

  const validId = await validate(id);

  if (!validId) {
    throw new AppError("Finance not found", 404);
  }

  const verifyExists = await financeRepository.exist({
    where: {
      id: id,
    },
    withDeleted: true,
  });

  if (!verifyExists) {
    throw new AppError("Finance not found", 404);
  }

  return next();
};

export default ensureFinanceExistsMiddleware;
