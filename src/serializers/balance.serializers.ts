import * as yup from "yup";
import { IAccountResponse } from "../interfaces/balance.interfaces";
import { SchemaOf } from "yup";

export const accountSchema: SchemaOf<IAccountResponse> = yup.object().shape({
  id: yup.number().required(),
  money: yup.number().required(),
});
