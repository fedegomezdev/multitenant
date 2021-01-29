import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Scope,
  Inject,
  BadRequestException
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TENANT_CONNECTION } from '../tenancy.provider';
import { Reflector } from '@nestjs/core';
import { Connection, getConnection, createConnection } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';
import { Tenant } from '../entities/tenant.entity';
import { TenancyService } from '../tenancy.service';

@Injectable({ scope: Scope.REQUEST })
export class TenantInterceptor implements NestInterceptor {
  constructor(
    @Inject(TENANT_CONNECTION)
    private readonly tenantService: TenancyService
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    // @ts-ignore
    const tenantName = context.args[2]?.req.params.tenant;

    if (!tenantName) {
      throw new BadRequestException('Tenant Param Error', 'This tenant does not exists');
    }

    const tenant: Tenant = await this.tenantService.findOne(tenantName);
    console.log('TENANT', tenant);
    if (!tenant) {
      throw new BadRequestException('Database Connection Error', 'This tenant does not exists');
    }

    try {
      getConnection(tenantName.name);
      next.handle();
    } catch (e) {
      //await this.connection.query(`CREATE DATABASE ${tenant.name}`);
      console.log('WE HAVE AND ERROR');
      const createdConnection: Connection = await createConnection({
        name: tenant.name,
        type: 'postgres',
        host: tenant.host,
        port: +tenant.port,
        username: tenant.username,
        password: tenant.password,
        database: tenant.name,
        entities: [User],
        ssl: tenant.ssl,
        synchronize: true
      });

      if (createdConnection) {
        return next.handle();
        //next();
      } else {
        throw new BadRequestException('Database Connection Error', 'There is a Error with the Database!');
      }
    }

    // Validate user with using reflector

    // Update user (for @CurrentUser as example) with using connection
  }
}
