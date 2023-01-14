import * as express from "express";
import Account from "../../entities/account.entity";

declare global {
  namespace Express {
    interface Request {
      user: {
        id: string;
        adm: boolean;
        account: number;
      };
      error: {
        message: string;
      };
    }
  }
}
