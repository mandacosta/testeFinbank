import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Finances_categories from "./finance_category.entity";

@Entity("category")
class Category {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({ length: 50, unique: true })
    name: string

    @OneToMany(() => Finances_categories, (finance_category) => finance_category.category) 
    financesCategory: Finances_categories[]
}

export default Category