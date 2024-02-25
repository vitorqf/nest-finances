import { User } from 'src/users/entities/user.entity';

export class CreateCardDto {
  flag: string;
  type: 'Crédito' | 'Débito';
  title: string;
  user: User;
  last_digits: string;
}
