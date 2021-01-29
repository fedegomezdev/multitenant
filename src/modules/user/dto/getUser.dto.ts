import { Exclude, Expose } from 'class-transformer';
import { IsNumber } from 'class-validator';
import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
@Exclude()
export class GetUserDto {
  @Field()
  @IsNumber()
  @Expose()
  readonly id: number;

  @Field()
  @IsNumber()
  @Expose()
  readonly email: string;
}
