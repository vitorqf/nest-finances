import { Transaction } from './transaction';

export type Category = {
  id: string;
  name: string;
  description: string;
  color: string;
  icon: string;
  transactions: Transaction[];
};
