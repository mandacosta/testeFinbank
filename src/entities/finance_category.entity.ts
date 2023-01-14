import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import Category from "./category.entity";
import Finance from "./finance.entity";

@Entity("finances_categories")
class Finances_categories {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Category, (category) => category.financesCategory, {
    eager: true,
  })
  category: Category;

  @ManyToOne(() => Finance, (finance) => finance.financesCategory)
  finance: Finance;
}

export default Finances_categories;
