import { Request, Response } from "express";
import { listAllTransfersService } from "../../services/transfer";

const listAllTransfersController = async (req: Request, res: Response) => {
    const userAccountId: number = +req.user.account;
    const transferences = await listAllTransfersService(userAccountId);
    return res.status(200).json(transferences);
};

export default listAllTransfersController;
