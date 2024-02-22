import { Transaction } from './transaction';

export type Card = {
  id: string;
  flag: string;
  number: string;
  expiry: string;
  cvc: string;
  balance: number;
  owner: string;
  type: 'credit' | 'debit';
  title: string;
  transactions: Transaction[];
};
