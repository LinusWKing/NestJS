import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/user/entities/user.entity";
import { Wallet } from "src/wallet/entities/wallet.entity";
import { Repository } from "typeorm";
import { UserData} from "./interface/profile.interface";



@Injectable()
export class ProfileService{
    constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
        
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>
    ) { }

    async getProfile(userId: number) {
        const user = await this.userRepository.findOne({ where: { id: userId } })

        const total = user.wallets.reduce((sum, x) => sum+ x.accBalance, 0)

        
        let profile: UserData = {
            email: user.email,
            username: user.username,
            ovr_balance:total
        }

        return {profile}
    }
    async getWallet(userId: number, username: string) {

        const user = await this.userRepository.findOne({ where: { id: userId } })
        const _wallet = user.wallets

        return {_wallet}
        
    }
    async getTransaction(walletId: number, username: string) {

        const wallet = await this.walletRepository.findOne({ where: { id: walletId } })
        const transaction = wallet.transactions

        return {transaction}
        
    }

}