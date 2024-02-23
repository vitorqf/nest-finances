import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Transaction } from './entities/transaction.entity';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private transactionsRepository: Repository<Transaction>,
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategory(categorySlug: string): Promise<Category> {
    const category = await this.categoriesRepository.findOne({
      select: ['id'],
      where: { slug: categorySlug },
    });
    return category;
  }

  async create(
    createTransactionDto: CreateTransactionDto,
  ): Promise<Transaction> {
    createTransactionDto.category = await this.getCategory(
      createTransactionDto.category.slug,
    );
    return await this.transactionsRepository.save(createTransactionDto);
  }

  findAll() {
    return this.transactionsRepository.find();
  }

  getTransaction(id: string) {
    return this.transactionsRepository.findOne({ where: { id } });
  }
}
