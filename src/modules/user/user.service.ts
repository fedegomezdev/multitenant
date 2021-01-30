import { Inject, Injectable, Scope } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { Connection, Repository } from 'typeorm';

import { TENANT_CONNECTION } from '../tenancy/tenancy.provider';
import { CreateUserDto, GetUserDto } from './dto';
import { User } from './entities/user.entity';

@Injectable({ scope: Scope.REQUEST })
export class UserService {
  private readonly userRepository: Repository<User>;

  constructor(@Inject(TENANT_CONNECTION) connection: Connection) {
    this.userRepository = connection.getRepository(User);
  }

  async getAllUsers(): Promise<GetUserDto[]> {
    try {
      const users = await this.userRepository.find();
      return users.map((user) => plainToClass(GetUserDto, user));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async createUser(user: CreateUserDto): Promise<GetUserDto> {
    try {
      const createdUser = await this.userRepository.save(user);
      return plainToClass(GetUserDto, createdUser);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
