import * as mongoose from 'mongoose';
import { ObjectID } from 'typeorm';

export const LogSchema = new mongoose.Schema({
  sql: String,
  dbs: Number,
  data: Date,
});
