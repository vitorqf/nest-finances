import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Card } from './entities/card.entity';
import { Repository } from 'typeorm';
import { CreateCardDto } from './dto/create-card.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CardsService {
  constructor(
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(email: string) {
    return this.usersRepository.findOne({
      where: { email },
    });
  }

  async create(createCardDto: CreateCardDto, user: any): Promise<Card> {
    const foundUser = await this.getUser(user.username);

    if (!foundUser) {
      throw new UnauthorizedException();
    }

    const card = {
      ...createCardDto,
      user: foundUser,
    };
    return this.cardsRepository.save(card);
  }

  getCard(id: string) {
    return this.cardsRepository.findOne({
      where: { id },
    });
  }

  async findAll(user: any) {
    return this.cardsRepository.find({
      where: { user: { email: user.username } },
    });
  }
}
