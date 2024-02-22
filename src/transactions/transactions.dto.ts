import { Card } from '../models/card';
import { Category } from '../models/category';

export class CreateTransactionDto {
  readonly amount: number;
  readonly title: string;
  readonly card: Card;
  readonly category: Category;
  readonly date: string;
}
