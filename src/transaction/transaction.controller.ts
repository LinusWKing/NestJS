import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Wallet } from 'src/wallet/wallet.decorator';


@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Post()
  create(@Wallet('id') walletId: number,@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionService.create(walletId, createTransactionDto);
  }

}
