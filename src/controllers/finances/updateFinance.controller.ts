import { Request, Response } from "express";
import { IFinanceUpdate } from "../../interfaces/finances.interfaces";
import { updateFinanceService } from "../../services/finances";

const updateFinanceController = async (req: Request, res: Response) => {
  const data: IFinanceUpdate = req.body;
  const financeId = req.params.id;
  const accountId = req.user.account;
  const error = req.error?.message;
  const updatedFinance = await updateFinanceService(data, financeId, accountId, error);

  return res.status(200).json(updatedFinance);
};

export default updateFinanceController;
