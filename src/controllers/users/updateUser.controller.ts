import { Request, Response } from "express";
import { IUserRequestUpdate } from "../../interfaces/users.interfaces";
import { updateUserService } from "../../services/users";

const updateUserController = async (req: Request, res: Response) => {
  const updateData: IUserRequestUpdate = req.body;
  const data = await updateUserService(updateData, req.params.id);

  return res.status(200).json(data);
};

export default updateUserController;
