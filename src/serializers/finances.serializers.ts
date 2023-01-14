import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IFinanceResponseArray,
  IFinanceUpdate,
  IFinanceUpdateResponse,
  TFinanceCategoryWithoutFinance,
} from "../interfaces/finances.interfaces";
import { ICategoryResponse } from "../interfaces/categories.interfaces";
import { IFinanceRequest, IFinanceResponse } from "../interfaces/finances.interfaces";

const categorySchema: SchemaOf<ICategoryResponse> = yup.object().shape({
  name: yup.string(),
  id: yup.string().uuid(),
});
const validCategorySchema = categorySchema.test("one-required", "category name or id is required", (value) => {
  return !!(value.name || value.id);
});

export const createFinanceSchema: SchemaOf<Omit<IFinanceRequest, "error">> = yup.object().shape({
  description: yup.string().max(150).required(),
  value: yup.number().required(),
  isIncome: yup.boolean().required(),
  category: yup.array().of(validCategorySchema).required(),
});

export const updateFinanceSerializer: SchemaOf<Omit<IFinanceUpdate, "error">> = yup.object().shape({
  description: yup.string(),
  value: yup.number(),
  isIncome: yup.boolean(),
  category: yup.array().of(validCategorySchema),
});

const updateFinanceArray: SchemaOf<IFinanceResponseArray> = yup.object().shape({
  id: yup.string(),
  category: yup.object().shape({
    id: yup.string(),
    name: yup.string(),
  }),
});

const errorShape = yup.object().shape({
  message: yup.string(),
});

export const updateFinanceRespSchema: SchemaOf<IFinanceUpdateResponse> = yup.object().shape({
  id: yup.string(),
  description: yup.string(),
  value: yup.number(),
  isIncome: yup.boolean(),
  isTransference: yup.boolean(),
  createdAt: yup.date(),
  financesCategory: yup.array().of(updateFinanceArray),
  error: yup
    .object()
    .shape({
      message: yup.string(),
    })
    .test("error-message-not-empty", "error object should not be empty", (val) => val.message !== ""),
});
