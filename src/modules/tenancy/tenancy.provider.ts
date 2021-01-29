import { ExecutionContext, Provider, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Connection, getConnection } from 'typeorm';
import { Request } from 'express';
import { Tenant } from './entities/tenant.entity';
import { GqlExecutionContext } from '@nestjs/graphql';

export const TENANT_CONNECTION = 'TENANT_CONNECTION';

export const TenancyProvider: Provider = {
  provide: TENANT_CONNECTION,
  inject: [REQUEST, Connection],
  scope: Scope.REQUEST,
  useFactory: async (req, connection: Connection) => {
    // const name: string = req.params['tenant'];
    // const tenantName = req.headers.tenant;
    // console.log(tenantName);
    // console.log(name);
    // const ctx = GqlExecutionContext.create(context);
    // const request = ctx.getContext().req;
    // console.log(request);
    // console.log(request.get('tenant'));
    console.log(req.req.params.tenant);
    const name = req.req.params.tenant;
    try {
      const tenant: Tenant = await connection.getRepository(Tenant).findOne({ where: { name } });
      console.log('TENANT IN FACTORY', tenant);
      return getConnection(tenant.name);
    } catch (error) {
      console.log(error);
    }
  }
};
