import { Card } from 'src/cards/entities/card.entity';
import { Category } from 'src/categories/entities/category.entity';

export class CreateTransactionDto {
  amount: number;
  title: string;
  card: Card;
  category: Category;
  date: string;
}
