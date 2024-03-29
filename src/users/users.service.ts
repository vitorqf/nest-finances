import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const saltOrRounds = await bcrypt.genSalt();
    const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
    createUserDto.password = hash;
    return this.usersRepository.save(createUserDto);
  }

  async findPasswordHash(username: string) {
    return await this.usersRepository
      .createQueryBuilder()
      .where({ email: username })
      .addSelect('password')
      .getRawOne();
  }

  findOne(username: string) {
    return this.usersRepository.findOne({ where: { email: username } });
  }

  findAll() {
    return this.usersRepository.find();
  }
}
