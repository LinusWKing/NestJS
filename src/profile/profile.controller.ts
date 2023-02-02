import { Controller, Get, Param } from "@nestjs/common";
import { User } from "src/user/user.decorator";
import { Wallet } from "src/wallet/wallet.decorator";
import { ProfileService } from "./profile.service";


@Controller('profile')
export class ProfileController {

    constructor(private profileService:ProfileService){}

    @Get()
    async getProfile(@User('id') userId: number) {
        return await this.profileService.getProfile(userId)
    }

    @Get('wallet')
    async getWallet(@User('id') userId: number) {
        return await this.profileService.getProfile(userId)
    }

    @Get('transaction')
    async getTransactions(@Wallet('id') userId: number) {
        return await this.profileService.getProfile(userId)
    }
    
}