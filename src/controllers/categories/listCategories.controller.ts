import { Request, Response } from "express";
import { listCategoriesService } from "../../services/categories";

const listCategoriesController = async (req: Request, res: Response) => {
  const data = await listCategoriesService();

  return res.status(200).json(data);
};

export default listCategoriesController;
