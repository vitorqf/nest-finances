import { Card } from './card';
import { Category } from './category';

export type Transaction = {
  id: string;
  date: string;
  amount: number;
  title: string;
  card: Card;
  category: Category;
};
