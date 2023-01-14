import { Router } from "express";
import { loginUserController } from "../controllers/login";
import schemaValidate from "../middlewares/schemaValidate.middleware";
import loginSerializer from "../serializers/login.serializers";

const loginRoutes = Router();

loginRoutes.post("", schemaValidate(loginSerializer), loginUserController);

export default loginRoutes;
