import { NextFunction, Request, Response } from "express";
import { AnySchema } from "yup";

const schemaValidate = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validatedData = await schema.validate(req.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    req.body = validatedData;

    return next();
  } catch (err: any) {
    console.log(err);
    return res.status(400).json({ message: err.errors });
  }
};

export default schemaValidate;
