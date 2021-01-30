import { Resolver, Args, Query, Mutation } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto, GetUserDto } from './dto';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User])
  async getUsers(): Promise<GetUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Mutation(() => User, { nullable: true })
  async createUser(@Args('input') data: CreateUserDto): Promise<GetUserDto> {
    return await this.userService.createUser(data);
  }
}
