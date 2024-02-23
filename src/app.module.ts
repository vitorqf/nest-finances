import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { CardsModule } from './cards/cards.module';
import { Card } from './cards/entities/card.entity';
import { CategoriesModule } from './categories/categories.module';
import { Category } from './categories/entities/category.entity';
import { Transaction } from './transactions/entities/transaction.entity';
import { TransactionsModule } from './transactions/transactions.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'monty',
      password: 'root123',
      database: 'nest',
      autoLoadEntities: true,
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Card, Transaction, User, Category]),
    TransactionsModule,
    CategoriesModule,
    CardsModule,
    UsersModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
