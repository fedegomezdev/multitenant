import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationResolver } from './authentication.resolver';

@Module({
  providers: [AuthenticationService, AuthenticationResolver]
})
export class AuthenticationModule {}
