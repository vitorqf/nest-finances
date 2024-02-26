import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Between, Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Category } from 'src/categories/entities/category.entity';
import { PaginationOptionsInterface, Pagination } from 'src/paginate';
import { Card } from 'src/cards/entities/card.entity';
import * as moment from 'moment';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
    @InjectRepository(Card)
    private cardsRepository: Repository<Card>,
  ) {}

  async getCard(cardId: string) {
    return this.cardsRepository.find({
      select: ['id'],
      where: { id: cardId },
    });
  }

  async getCategory(categorySlug: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      select: ['id'],
      where: { slug: categorySlug },
    });
    return category;
  }

  async paginate(
    options: PaginationOptionsInterface,
  ): Promise<Pagination<Transaction>> {
    let query: object = {};
    switch (options.filter) {
      case 'category': {
        const category = await this.getCategory(options.filterBy);
        query = {
          ...query,
          category,
        };
        break;
      }
      case 'card': {
        const card = await this.getCard(options.filterBy);
        query = {
          ...query,
          card,
        };
        break;
      }
    }

    if (options.date) {
      const date = moment(options.date).format();
      query = {
        ...query,
        date: Between(
          moment(date).startOf('month').toDate(),
          moment(date).endOf('month').subtract(1, 'day').toDate(),
        ),
      };
    }

    const [results, total] = await this.transactionsRepository.findAndCount({
      take: options.limit,
      skip: options.page * options.limit,
      order: { created_at: 'DESC' },
      relations: ['category', 'card'],
      where: query,
    });

    return new Pagination<Transaction>({
      results,
      total,
    });
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    const transactionWithCategory = {
      ...createTransactionDto,
      category: await this.getCategory(createTransactionDto.category),
    };
    const res = await this.transactionsRepository.save(transactionWithCategory);
    return res;
  }

  findAll() {
    return this.transactionsRepository.find({
      relations: ['category', 'card'],
      order: { date: 'DESC' },
    });
  }

  findAllPerDate(date: Date) {
    return this.transactionsRepository.find({
      where: { date },
      relations: ['category', 'card'],
    });
  }

  getTransaction(id: string) {
    return this.transactionsRepository.findOne({
      where: { id },
      relations: ['category', 'card'],
    });
  }
}
