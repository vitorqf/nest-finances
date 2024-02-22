import { Body, Controller, Get, Post } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './cards.dto';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @Get()
  async findAll() {
    return this.cardsService.findAll();
  }

  @Get(':id')
  async getCard(id: string) {
    return this.cardsService.getCard(id);
  }
}
