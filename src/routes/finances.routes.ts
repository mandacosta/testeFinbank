import { Router } from "express";
import { updateFinanceController } from "../controllers/finances";
import createFinanceController from "../controllers/finances/createFinnance.controller";
import getFinancesController from "../controllers/finances/getFinances.controller";
import { ensureAuthMiddleware } from "../middlewares/auth";
import { ensureCategoryExistsMiddleware } from "../middlewares/categories";
import { ensureFinanceExistsMiddleware } from "../middlewares/finances";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { createFinanceSchema, updateFinanceSerializer } from "../serializers/finances.serializers";

const financesRoutes = Router();

financesRoutes.patch(
  "/:id",
  ensureAuthMiddleware,
  ensureFinanceExistsMiddleware,
  schemaValidate(updateFinanceSerializer),
  ensureCategoryExistsMiddleware,
  updateFinanceController
);
financesRoutes.post(
  "",
  ensureAuthMiddleware,
  schemaValidate(createFinanceSchema),
  ensureCategoryExistsMiddleware,
  createFinanceController
);

financesRoutes.get("", ensureAuthMiddleware, getFinancesController);

export default financesRoutes;
