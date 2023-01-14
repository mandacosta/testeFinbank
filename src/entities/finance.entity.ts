import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Account from "./account.entity";
import Finances_categories from "./finance_category.entity";

@Entity("finances")
class Finance {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  description: string;

  @Column({ type: "decimal", precision: 30, scale: 2 })
  value: number;

  @Column()
  isIncome: boolean;

  @Column({ default: false })
  isTransference: boolean;

  @ManyToOne(() => Account, (account) => account.id)
  account: Account;

  @OneToMany(() => Finances_categories, (finance_category) => finance_category.finance, {
    eager: true,
    onDelete: "CASCADE",
  })
  financesCategory: Finances_categories[];

  @CreateDateColumn()
  createdAt: Date;
}

export default Finance;
