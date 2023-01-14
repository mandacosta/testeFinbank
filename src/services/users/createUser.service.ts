import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import User from "../../entities/user.entity";
import AppError from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces/users.interfaces";
import { returnUserSchema } from "../../serializers/users.serializers";

const createUserService = async (
  body: IUserRequest
): Promise<IUserResponse> => {
  const userRepo = AppDataSource.getRepository(User);

  const foundEmail = await userRepo.find({
    where: { email: body.email },
    withDeleted: true,
  });

  const foundCPF = await userRepo.find({
    where: { CPF: body.CPF },
    withDeleted: true,
  });

  if (foundEmail[0]) {
    throw new AppError("Email already exists", 409);
  }

  if (foundCPF[0]) {
    throw new AppError("CPF already exists", 409);
  }

  const accountRepo = AppDataSource.getRepository(Account);
  const accountCreate = accountRepo.create();
  await accountRepo.save(accountCreate);

  //mes-dia-ano
  const [month, day, year] = body.birthdate.split("/").map(Number);
  const userCreation = userRepo.create({
    ...body,
    birthdate: `${day}-${month}-${year}`,
    account: accountCreate,
  });

  await userRepo.save(userCreation);

  const validateUserReturn = await returnUserSchema.validate(userCreation, {
    abortEarly: false,
    stripUnknown: true,
  });

  return validateUserReturn;
};

export default createUserService;
