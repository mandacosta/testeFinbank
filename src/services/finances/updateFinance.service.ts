import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";
import Finance from "../../entities/finance.entity";
import Finances_categories from "../../entities/finance_category.entity";
import AppError from "../../errors/AppError";
import { IFinanceUpdate, IFinanceUpdateResponse } from "../../interfaces/finances.interfaces";
import { updateFinanceRespSchema } from "../../serializers/finances.serializers";

const updateFinanceService = async (
  data: IFinanceUpdate,
  financeId: string,
  accountId: number,
  error: string
): Promise<IFinanceUpdateResponse> => {
  const financeRepository = AppDataSource.getRepository(Finance);

  const finance = await financeRepository
    .createQueryBuilder("finance")
    .innerJoinAndSelect("finance.financesCategory", "financesCategory")
    .where("finance.account = :account AND finance.id = :id", {
      account: accountId,
      id: financeId,
    })
    .getOne();

  if (!finance) {
    throw new AppError("It is not possible to change this finance", 401);
  }

  if (finance.isTransference) {
    throw new AppError("It is not possible to change this finance", 401);
  }

  const categoriesRepo = AppDataSource.getRepository(Category);
  const categoriesName = data.category.map((cat) => cat.name);
  const categoriesId = data.category.map((cat) => cat.id);

  const findedCategories = await categoriesRepo
    .createQueryBuilder("category")
    .where("category.name IN (:...name) OR category.id IN (:...id)", { name: categoriesName, id: categoriesId })
    .getMany();

  const finCatRepo = AppDataSource.getRepository(Finances_categories);

  const finCats = findedCategories.map((cat) => {
    const newFinCat = finCatRepo.create({
      finance: finance,
      category: cat,
    });
    return newFinCat;
  });

  await finCatRepo.save(finCats);

  const updateFinance = financeRepository.create({
    ...finance,
    ...data,
    financesCategory: finCats,
  });

  await financeRepository.save(updateFinance);

  const updateFinanceResponse = updateFinanceRespSchema.validateSync(updateFinance, {
    stripUnknown: true,
  });

  if (error) {
    updateFinanceResponse.error.message = error;
  } else {
    const { error, ...rest } = updateFinanceResponse;
    return { ...rest };
  }

  return updateFinanceResponse;
};

export default updateFinanceService;
