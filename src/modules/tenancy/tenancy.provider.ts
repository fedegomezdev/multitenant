import { Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Connection, getConnection } from 'typeorm';
import { Tenant } from './entities/tenant.entity';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

export const TenancyProvider: Provider = {
  provide: TENANT_CONNECTION,
  inject: [REQUEST, Connection],
  scope: Scope.REQUEST,

  useFactory: async (request, connection: Connection) => {
    const name = request.req.params.tenant;
    try {
      const tenant: Tenant = await connection.getRepository(Tenant).findOne({ where: { name: name } });
      if (!tenant) {
        throw new Error('The tenant in provider does not exist');
      }
      return getConnection(tenant.name);
    } catch (error) {
      throw new Error(error.message);
    }
  }
};
