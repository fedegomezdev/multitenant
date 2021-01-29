import { Controller, Body, Get, Post } from '@nestjs/common';
import { CreateTenantDto, GetTenantDto } from './dto';
import { TenancyService } from './tenancy.service';

@Controller('tenancy')
export class TenancyController {
  constructor(private readonly tenantService: TenancyService) {}

  @Get()
  findAll(): Promise<GetTenantDto[]> {
    return this.tenantService.findAll();
  }

  @Post()
  create(@Body() tenant: CreateTenantDto): Promise<GetTenantDto> {
    return this.tenantService.create(tenant);
  }
}
