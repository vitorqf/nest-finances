import { Card } from 'src/cards/entities/card.entity';

export class CreateTransactionDto {
  amount: number;
  title: string;
  card: Card;
  category: string;
  date: Date;
}
