import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToClass } from 'class-transformer';
import { Repository } from 'typeorm';
import { CreateTenantDto, GetTenantDto } from './dto';
import { Tenant } from './entities/tenant.entity';

@Injectable()
export class TenancyService {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>
  ) {}

  async findAll(): Promise<GetTenantDto[]> {
    const tenants = await this.tenantRepository.find();

    return tenants.map((tenant) => plainToClass(GetTenantDto, tenant));
  }

  async findOne(name: string) {
    return await this.tenantRepository.findOne({ name });
  }

  async create(tenant: CreateTenantDto): Promise<GetTenantDto> {
    const createdTenant = await this.tenantRepository.save(tenant);
    return plainToClass(GetTenantDto, createdTenant);
  }
}
