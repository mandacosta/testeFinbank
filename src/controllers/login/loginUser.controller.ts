import { Request, Response } from "express";
import ILoginRequest from "../../interfaces/login.interfaces";
import { loginUserService } from "../../services/login";

const loginUserController = async (req: Request, res: Response) => {
  const loginData: ILoginRequest = req.body;
  const token = await loginUserService(loginData);
  return res.status(200).json({ token });
};

export default loginUserController;
