import { Router } from "express";
import { listCategoriesController } from "../controllers/categories";

const categoriesRoutes = Router();

categoriesRoutes.get("", listCategoriesController);

export default categoriesRoutes;
