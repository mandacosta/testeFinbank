import * as yup from "yup";
import { SchemaOf } from "yup";
import { ITransferRequest, ITransferResponse } from "../interfaces/transfer.interfaces";
export const transferSchemaReq: SchemaOf<ITransferRequest> = yup.object().shape({
  description: yup.string().required(),
  value: yup.number().required(),
  date: yup.string().notRequired(),
});

export const tranferSchemaRes: SchemaOf<ITransferResponse> = yup.object().shape({
  id: yup.string(),
  description: yup.string(),
  date: yup.date(),
  value: yup.number(),
  createdAt: yup.date(),
  receiverAccount: yup.object().shape({
    id: yup.number(),
  }),
  senderAccount: yup.object().shape({
    id: yup.number(),
  }),
});
