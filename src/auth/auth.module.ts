import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/users/schema/user.schema';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategy/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { Roles, RolesSchema } from './schema/roles.schema';


@Module({
  imports:[MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
   PassportModule,
    JwtModule.register({
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: '20h' },
  }),
  MongooseModule.forFeature([{name: Roles.name, schema: RolesSchema}])],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
