import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { LogModule } from './log/log.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/agnostic'),
    UserModule,
    LogModule,
    DatabaseModule,
  ],
})
export class AppModule {}
