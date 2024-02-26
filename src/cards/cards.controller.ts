import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  // @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createCardDto: CreateCardDto) {
    return this.cardsService.create(createCardDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.cardsService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCard(id: string) {
    return this.cardsService.getCard(id);
  }
}
