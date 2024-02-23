import { User } from 'src/users/entities/user.entity';

export class CreateCardDto {
  flag: string;
  type: 'credit' | 'debit';
  title: string;
  user: User;
}
