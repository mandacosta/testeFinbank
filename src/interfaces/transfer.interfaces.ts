import { IFinanceRequest } from "./finances.interfaces";

export interface ITransferRequest {
  description: string;
  value: number;
  date?: string;
}

export interface ITransferResponse {
  id: string;
  description: string;
  date: Date;
  value: number;
  createdAt: Date;
  receiverAccount: {
    id: number;
  };
  senderAccount: {
    id: number;
  };
}

export interface ITransferFinance extends Omit<IFinanceRequest, "isIncome"> {
  isTransference: boolean;
}
