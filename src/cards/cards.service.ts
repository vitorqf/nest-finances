import { Injectable } from '@nestjs/common';
import { Card } from 'src/models/card';

@Injectable()
export class CardsService {
  private readonly cards: Card[] = [];

  create(card: Card) {
    this.cards.push(card);
  }

  getCard(id: string): Card {
    return this.cards.find((card) => card.id === id);
  }

  findAll(): Card[] {
    return this.cards;
  }
}
