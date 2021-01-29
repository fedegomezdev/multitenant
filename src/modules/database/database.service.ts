import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';

export const databaseProviders = [
  TypeOrmModule.forRootAsync({
    inject: [ConfigService],
    async useFactory(config: ConfigService) {
      return {
        type: 'postgres',
        host: config.get('DB_HOST'),
        username: config.get('DB_USER'),
        password: config.get('DB_PASSWORD'),
        port: +config.get('DB_PORT'),
        database: config.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true
      } as ConnectionOptions;
    }
  })
];
