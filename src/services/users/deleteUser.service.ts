import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";

const deleteUserService = async (id: string): Promise<void> => {
  const userRepo = AppDataSource.getRepository(User);

  const userUpdate = await userRepo.save({
    id: id,
    isActive: false,
  });
  await userRepo.softRemove({ id: id });
};

export default deleteUserService;
