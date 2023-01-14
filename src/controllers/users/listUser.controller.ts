import { Request, Response } from "express";
import listUserService from "../../services/users/listUser.service";

const listUserController = async (req: Request, res: Response) => {
  const data = await listUserService(req.params.id);

  return res.status(200).json(data);
};

export default listUserController;
