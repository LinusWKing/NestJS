import { Wallet } from "src/wallet/entities/wallet.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('transaction')
export class Transaction {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    type: string;
    
    @Column()
    amount: number;

    @ManyToOne(() => Wallet, (wallet) => wallet.transactions)
    owner:Transaction


}
