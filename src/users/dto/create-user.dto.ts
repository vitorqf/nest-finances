import { Card } from 'src/cards/entities/card.entity';
import { Transaction } from 'src/transactions/entities/transaction.entity';

export class CreateUserDto {
  name: string;
  email: string;
  password: string;
  cards: Card[];
  transactions: Transaction[];
}
