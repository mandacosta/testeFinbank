import AppDataSource from "../../data-source";
import Category from "../../entities/category.entity";

const listCategoriesService = async (): Promise<Category[]> => {
  const categoriesRepo = AppDataSource.getRepository(Category);

  const categories = await categoriesRepo.find();

  return categories;
};

export default listCategoriesService;
