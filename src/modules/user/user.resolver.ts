import { UseInterceptors } from '@nestjs/common';
import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, GetUserDto } from './dto';
//import { CurrentTenant } from '../tenancy/decorators/tenancy.decorator';
import { TenantInterceptor } from '../tenancy/interceptors/tenancy.interceptors';

@Resolver(() => User)
@UseInterceptors(TenantInterceptor)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<GetUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User)
  async createUser(@Args('input') data: CreateUserDto): Promise<GetUserDto> {
    return this.userService.createUser(data);
  }
}
