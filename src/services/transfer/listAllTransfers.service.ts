import AppDataSource from "../../data-source";
import Account from "../../entities/account.entity";
import Transference from "../../entities/transference.entity";
import { ITransferResponse } from "../../interfaces/transfer.interfaces";
import { tranferSchemaRes } from "../../serializers/transfer.serializers";

const listAllTransfersService = async (userAccountId: number): Promise<ITransferResponse[]> => {
  const accountRepo = AppDataSource.getRepository(Account);

  const account = await accountRepo
    .createQueryBuilder("accounts")
    .innerJoinAndSelect("accounts.transference", "transference")
    .innerJoinAndSelect("transference.receiverAccount", "receiver")
    .innerJoinAndSelect("transference.senderAccount", "sender")
    .where("accounts.id = :id", { id: userAccountId })
    .getOne();

  const tranferencesWithoutMoney: ITransferResponse[] = await account.transference.map((transf) => {
    const validatedTransferences = tranferSchemaRes.validateSync(transf, {
      stripUnknown: true,
    });

    return validatedTransferences;
  });

  return tranferencesWithoutMoney;
};

export default listAllTransfersService;
