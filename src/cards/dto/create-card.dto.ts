export class CreateCardDto {
  flag: string;
  type: 'Crédito' | 'Débito';
  title: string;
  last_digits: string;
}
