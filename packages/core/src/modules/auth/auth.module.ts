import { MikroOrmModule } from "@mikro-orm/nestjs";
import { Module } from "@nestjs/common";
import { UserEntity } from "../user/user.entity";
import { UserService } from "../user/user.service";
import { AuthResolver } from "./auth.resolver";
import { AuthService } from "./auth.service";

@Module({
  imports: [MikroOrmModule.forFeature([UserEntity])],
  providers: [UserService, AuthService, AuthResolver],
  exports: [AuthService],
})
export class AuthModule {}
