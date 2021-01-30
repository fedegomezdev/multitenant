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
    try {
      const tenants = await this.tenantRepository.find();
      return tenants.map((tenant) => plainToClass(GetTenantDto, tenant));
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByName(name: string) {
    try {
      return await this.tenantRepository.findOne({ name });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async create(tenant: CreateTenantDto): Promise<GetTenantDto> {
    try {
      const createdTenant = await this.tenantRepository.save(tenant);
      return plainToClass(GetTenantDto, createdTenant);
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
