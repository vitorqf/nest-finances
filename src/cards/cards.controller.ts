import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { CreateCardDto } from './dto/create-card.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('cards')
export class CardsController {
  constructor(private readonly cardsService: CardsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createCardDto: CreateCardDto, @Request() req) {
    return this.cardsService.create(createCardDto, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Request() req) {
    return this.cardsService.findAll(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getCard(id: string) {
    return this.cardsService.getCard(id);
  }
}
