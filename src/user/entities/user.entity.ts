import { IsEmail, IsString } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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

}
