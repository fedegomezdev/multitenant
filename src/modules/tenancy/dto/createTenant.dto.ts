import { IsString } from 'class-validator';

export class CreateTenantDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly host: string;

  @IsString()
  readonly port: string;

  @IsString()
  readonly username: string;

  @IsString()
  readonly password: string;

  @IsString()
  readonly description: string;
}
