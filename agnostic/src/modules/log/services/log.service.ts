import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { LogDto } from '../dto/log.dto';
import { LogInterface } from '../interfaces/log.interface';

@Injectable()
export class LogService {
  constructor(@InjectModel('Log') private readonly logModel: Model<LogInterface>) {}

  async saveLog(log: LogDto) {
      const createLog = new this.logModel(log);
      createLog.save();
  }

  async findAll(id): Promise<LogDto[]> {
      return await this.logModel.find({ dbs: id}).exec();
  }

  async remove(registro: LogDto) {
      return await this.logModel.deleteOne({
          _id: registro._id,
      });
  }
}