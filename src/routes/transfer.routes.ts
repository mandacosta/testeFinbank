import { Router } from "express";
import { createTransferController, listAllTransfersController } from "../controllers/transfer";
import { ensureAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import { transferSchemaReq } from "../serializers/transfer.serializers";

const transferRoutes = Router();

transferRoutes.post("/:id", ensureAuthMiddleware, schemaValidate(transferSchemaReq), createTransferController);
transferRoutes.get("", ensureAuthMiddleware, listAllTransfersController);

export default transferRoutes;
