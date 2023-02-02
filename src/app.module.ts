import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { WalletModule } from './wallet/wallet.module';
import { TransactionModule } from './transaction/transaction.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [UserModule, WalletModule, TransactionModule, ProfileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
