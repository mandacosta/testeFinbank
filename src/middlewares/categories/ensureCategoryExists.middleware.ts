import { NextFunction, Request, Response } from "express";
import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import AppError from "../../errors/AppError";
import { IFinanceRequest } from "../../interfaces/finances.interfaces";

const ensureCategoryExistsMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const data: IFinanceRequest = req.body;

  const categoriesRepo = AppDataSource.getRepository(Category);

  const categoriesExistsPromisse = data.category.map(async (cat) => {
    const catExists = await categoriesRepo
      .createQueryBuilder("category")
      .where("category.id = :id OR category.name = :name", { id: cat.id, name: cat.name })
      .getOne();

    if (catExists) {
      return catExists;
    }
  });

  const error = {
    message: "",
  };

  const categoriesExists = await Promise.all(categoriesExistsPromisse).then((res) =>
    res.filter((cat, index) => {
      if (!cat) {
        error.message += `Category in index ${index} not found. `;

        return false;
      }
      return true;
    })
  );

  data.category = categoriesExists;
  if (error.message.length) {
    req.error = error;
  }

  if (!categoriesExists.length) {
    throw new AppError("reported categories not found");
  }

  next();
};

export default ensureCategoryExistsMiddleware;
