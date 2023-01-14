import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import { IBalanceResponse } from "../../interfaces/balance.interfaces";

const userBalanceService = async (userAccount: number): Promise<IBalanceResponse> => {
  const balance = await AppDataSource.createQueryBuilder()
    .select(["account.money"])
    .from(Account, "account")
    .where("id = :account", { account: userAccount })
    .getOne();

  return { money: +balance.money };
};

export default userBalanceService;
