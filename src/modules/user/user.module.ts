import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserResolver } from './user.resolver';
import { TenancyModule } from '../tenancy/tenancy.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User]), TenancyModule],
  providers: [UserService, UserResolver],
  controllers: [UserController]
})
export class UserModule {}
