import { Document } from 'mongoose';
import { ObjectID } from 'typeorm';

export interface LogInterface extends Document {
  readonly sql: string;
  readonly dbs: number;
  readonly data: Date;
}