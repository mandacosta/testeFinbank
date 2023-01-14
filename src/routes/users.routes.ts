import { Router } from "express";
import { createUserController, deleteUserController, updateUserController } from "../controllers/users";
import listUserController from "../controllers/users/listUser.controller";
import { ensureAuthMiddleware, ensureAdmOwnerAuthMiddleware } from "../middlewares/auth";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import ensureUserExistsMiddleware from "../middlewares/users/ensureUserExists.middleware";
import { createUserSchema, updateUserSchema } from "../serializers/users.serializers";

const userRoutes = Router();
userRoutes.patch(
  "/:id",
  schemaValidate(updateUserSchema),
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
  updateUserController
);
userRoutes.post("", schemaValidate(createUserSchema), createUserController);
userRoutes.delete("/:id", ensureAuthMiddleware, ensureAdmOwnerAuthMiddleware, deleteUserController);
userRoutes.get(
  "/:id",
  ensureAuthMiddleware,
  ensureAdmOwnerAuthMiddleware,
  ensureUserExistsMiddleware,
  listUserController
);

export default userRoutes;
