import { Request, Response } from "express";
import { ITransferRequest } from "../../interfaces/transfer.interfaces";
import { createTransferService } from "../../services/transfer";

const createTransferController = async (req: Request, res: Response) => {
  const dataTransfer: ITransferRequest = req.body;
  const accountId = req.user.account;
  const receivedId: number = +req.params.id;

  const data = await createTransferService(dataTransfer, accountId, receivedId);

  return res.status(201).json(data);
};

export default createTransferController;
