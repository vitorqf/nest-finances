import { Transaction } from '../models/transaction';

export class CreateCardDto {
  readonly flag: string;
  readonly number: string;
  readonly expiry: string;
  readonly cvc: string;
  readonly balance: number;
  readonly owner: string;
  readonly type: 'credit' | 'debit';
  readonly title: string;
  readonly transactions: Transaction[];
}
