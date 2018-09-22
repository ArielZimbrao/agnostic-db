import { Module, Global } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogService } from './services/log.service';
import { LogSchema } from './schemas/log.schema';

@Global()
@Module({
  imports: [MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}