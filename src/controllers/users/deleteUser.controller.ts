import { Request, Response } from "express";
import { deleteUserService } from "../../services/users";

const deleteUserController = async (req: Request, resp: Response) => {
  const deleteId = req.params.id;
  await deleteUserService(deleteId);
  return resp.status(204).send();
};

export default deleteUserController;
