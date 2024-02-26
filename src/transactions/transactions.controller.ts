import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Pagination } from 'src/paginate/pagination';
import { Transaction } from './entities/transaction.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createTransactionDto: CreateTransactionDto) {
    return this.transactionsService.create(createTransactionDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async index(@Request() request): Promise<Pagination<Transaction>> {
    return await this.transactionsService.paginate({
      limit: request.query.hasOwnProperty('limit') ? request.query.limit : 10,
      page: request.query.hasOwnProperty('page') ? request.query.page : 0,
      filter: request.query.hasOwnProperty('filter')
        ? request.query.filter
        : '',
      filterBy: request.query.hasOwnProperty('filterBy')
        ? request.query.filterBy
        : '',
      date: request.query.hasOwnProperty('date') ? request.query.date : '',
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTransaction(id: string) {
    return this.transactionsService.getTransaction(id);
  }
}
