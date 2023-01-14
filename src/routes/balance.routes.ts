import { Router } from "express";
import { userBalanceController } from "../controllers/balance";
import { ensureAuthMiddleware } from "../middlewares/auth";

const balanceRoutes = Router();

balanceRoutes.get("", ensureAuthMiddleware, userBalanceController);

export default balanceRoutes;
