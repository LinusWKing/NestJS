import { IsEmail, IsString } from "class-validator";
import { Wallet } from "src/wallet/entities/wallet.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity('User')
export class User { 

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    username: string;

    @Column()
    @IsEmail()
    email: string;

    @OneToMany(() => Wallet, (wallet) => wallet.owner)
    wallets: Wallet[]

}
