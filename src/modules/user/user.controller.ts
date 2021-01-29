import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, GetUserDto } from './dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll(): Promise<GetUserDto[]> {
    return this.userService.getAllUsers();
  }

  @Post()
  async create(@Body() user: CreateUserDto): Promise<GetUserDto> {
    return this.userService.createUser(user);
  }
}
