import AppDataSource from "../../data-source";
import Finance from "../../entities/finance.entity";
import { IUser } from "../../interfaces/users.interfaces";

const getFinancesService = async (userData: IUser): Promise<Finance[]> => {
  //Repositório de finanças
  const financeRepo = AppDataSource.getRepository(Finance);
  const financeList = await financeRepo.find({
    where: {
      account: {
        id: userData.account,
      },
    },
    relations: {
      financesCategory: true,
    },
  });

  return financeList;
};

export default getFinancesService;
