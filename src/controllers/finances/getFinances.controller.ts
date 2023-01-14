import { Request, Response } from "express";
import { getFinancesService } from "../../services/finances";

const getFinancesController = async (req: Request, resp: Response) => {
  const returnedFinnances = await getFinancesService(req.user);
  return resp.status(201).json(returnedFinnances);
};

export default getFinancesController;
