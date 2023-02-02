import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { User } from 'src/user/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Wallet } from './entities/wallet.entity';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(Wallet)
    private readonly walletRepository: Repository<Wallet>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ){}
  async create(userId: number, createWalletDto: CreateWalletDto) {
   
    let wallet = new Wallet();
    wallet.accName = createWalletDto.accName
    wallet.accBalance = createWalletDto.accBalance

    const newWallet = await this.walletRepository.save(wallet)

    const owner = await this.userRepository.findOne({ where: { id: userId }, relations: ['wallets'] });
    owner.wallets.push(wallet)

    await this.userRepository.save(owner)

    return newWallet


  }

  update(id: number, updateWalletDto: UpdateWalletDto) {
    return `This action updates a #${id} wallet`;
  }

}
