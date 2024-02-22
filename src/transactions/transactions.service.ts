import { Injectable } from '@nestjs/common';
import { Transaction } from 'src/models/transaction';

@Injectable()
export class TransactionsService {
  private readonly transactions: Transaction[] = [];

  create(transaction: Transaction) {
    this.transactions.push(transaction);
  }

  findAll(): Transaction[] {
    return this.transactions;
  }

  getTransaction(id: string): Transaction {
    return this.transactions.find((transaction) => transaction.id === id);
  }
}
