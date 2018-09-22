import { ObjectID } from 'typeorm';

export class LogDto {
    _id: ObjectID;
    sql: string;
    dbs: number;
    date: Date;
}