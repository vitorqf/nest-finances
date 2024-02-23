import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import dashify from 'dashify';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const categoryWithSlug = await this.uniqueSlug(createCategoryDto);
    return this.categoriesRepository.save(categoryWithSlug);
  }

  findAll() {
    return this.categoriesRepository.find();
  }

  getCategory(id: string) {
    return this.categoriesRepository.findOne({ where: { id } });
  }

  async uniqueSlug(category: CreateCategoryDto): Promise<CreateCategoryDto> {
    category.slug = dashify(category.title, {
      condense: true,
    });

    const exists = await this.findSlugs(category.slug);

    // if slug doesn't already exists
    if (!exists || exists.length === 0) {
      return category;
    }
    // Add to suffix
    category.slug = category.slug + '-' + exists.length;

    return category;
  }

  private async findSlugs(slug: string): Promise<CreateCategoryDto[]> {
    return await this.categoriesRepository
      .createQueryBuilder('category')
      .where('slug like :slug', { slug: `${slug}%` })
      .getMany();
  }
}
