import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransactionsController } from './transactions/transactions.controller';
import { TransactionsService } from './transactions/transactions.service';
import { CardsService } from './cards/cards.service';
import { UsersService } from './users/users.service';
import { CardsController } from './cards/cards.controller';
import { UsersController } from './users/users.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    TransactionsController,
    CardsController,
    UsersController,
  ],
  providers: [AppService, TransactionsService, CardsService, UsersService],
})
export class AppModule {}
