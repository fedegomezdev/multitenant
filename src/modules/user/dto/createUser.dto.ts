import { Exclude, Expose } from 'class-transformer';
import { IsString } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
@Exclude()
export class CreateUserDto {
  @Field()
  @IsString()
  @Expose()
  readonly email: string;
}
