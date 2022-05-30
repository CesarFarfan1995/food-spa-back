import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Roles, RolesSchema } from './auth/schema/roles.schema';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [ProductsModule,
    ConfigModule.forRoot({isGlobal:true}),
    MongooseModule.forRoot(process.env.DB_URL),
   UsersModule,
    AuthModule,    
   MongooseModule.forFeature([{name:Roles.name, schema:RolesSchema}]) ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
