import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/entities/user.entity";
import { Transaction } from "src/transaction/entities/transaction.entity";


@Entity('wallet')
export class Wallet { 
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    accName: string

    @Column()
    accBalance: number

    @ManyToOne(() => User, (user) => user.wallets)
    owner: User

    @OneToMany(() => Transaction, (transaction) => transaction.owner)
    transactions:Transaction[]

}
