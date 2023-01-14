import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Category from "../../entities/category.entity";
import Finance from "../../entities/finance.entity";
import Finances_categories from "../../entities/finance_category.entity";
import User from "../../entities/user.entity";
import { IFinanceRequest, IFinanceResponse } from "../../interfaces/finances.interfaces";

const createFinanceService = async (body: IFinanceRequest, userId: string): Promise<IFinanceResponse> => {
  //Repositório do Usuário
  const userRepo = AppDataSource.getRepository(User);
  const foundUser = await userRepo.findOne({
    where: { id: userId },
    relations: { account: true },
  });

  //Alterar o valor da conta
  if (body.isIncome) {
    foundUser.account.money = Number(foundUser.account.money) + body.value;
  } else {
    foundUser.account.money = Number(foundUser.account.money) - body.value;
  }

  //Repositório de account
  const accountRepo = AppDataSource.getRepository(Account);
  await accountRepo.save(foundUser.account);

  //Repositório de finanças
  const financeRepo = AppDataSource.getRepository(Finance);
  const newFinance = financeRepo.create({
    value: body.value,
    description: body.description,
    isIncome: body.isIncome,
    account: foundUser.account,
  });
  await financeRepo.save(newFinance);

  //Repositório de categorias
  const categoriesRepo = AppDataSource.getRepository(Category);
  const categoriesName = body.category.map((cat) => cat.name);
  const categoriesId = body.category.map((cat) => cat.id);

  const findedCategories = await categoriesRepo
    .createQueryBuilder("category")
    .where("category.name IN (:...name) OR category.id IN (:...id)", { name: categoriesName, id: categoriesId })
    .getMany();

  //Repositório de finanças_categorias
  const finCatRepo = AppDataSource.getRepository(Finances_categories);
  const finCats: Finances_categories[] = findedCategories.map((cat) => {
    const newFinCat = finCatRepo.create({
      finance: newFinance,
      category: cat,
    });
    return newFinCat;
  });

  await finCatRepo.save(finCats);

  const financeReturn = await financeRepo.findOne({
    where: { id: newFinance.id },
    relations: { financesCategory: true },
  });

  return financeReturn;
};

export default createFinanceService;
