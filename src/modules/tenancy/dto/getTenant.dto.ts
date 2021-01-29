import { Exclude, Expose } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

@Exclude()
export class GetTenantDto {
  @IsNumber()
  @Expose()
  readonly id: number;

  @IsString()
  @Expose()
  readonly name: string;

  @IsString()
  @Expose()
  readonly host: string;
}
