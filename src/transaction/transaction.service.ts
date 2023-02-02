import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';


@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Wallet)
    private walletRepsoitory:Repository<Wallet>

  ){}
  async create(walletId:number, createTransactionDto: CreateTransactionDto) {
    
    let transaction = new Transaction();
    transaction.type = createTransactionDto.type
    transaction.amount = createTransactionDto.amount

    const newTransaction = await this.transactionRepository.save(transaction)

    const owner = await this.walletRepsoitory.findOne({ where: { id: walletId }, relations: ['transaction'] });
    owner.transactions.push(transaction)

    if (createTransactionDto.type === 'expense') {
      owner.accBalance -= createTransactionDto.amount
    } else if (createTransactionDto.type === 'income') {
      owner.accBalance += createTransactionDto.amount
    }

    await this.walletRepsoitory.save(owner)

    return newTransaction
  }

}
