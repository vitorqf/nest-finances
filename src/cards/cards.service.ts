import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  create(createCardDto: CreateCardDto): Promise<Card> {
    return this.cardsRepository.save(createCardDto);
  }

  getCard(id: string) {
    return this.cardsRepository.findOne({
      where: { id },
    });
  }

  findAll() {
    return this.cardsRepository.find();
  }
}
