import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @Get()
  async findAll(@Query('date') date: Date) {
    if (date) {
      return this.transactionsService.findAllPerDate(date);
    }
    return this.transactionsService.findAll();
  }

  @Get(':id')
  async getTransaction(id: string) {
    return this.transactionsService.getTransaction(id);
  }
}
