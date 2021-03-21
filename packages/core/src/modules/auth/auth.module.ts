import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { User } from '../user/user.entity';
import { UserService } from '../user/user.service';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';

@Module({
  imports: [MikroOrmModule.forFeature([User])],
  providers: [UserService, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
