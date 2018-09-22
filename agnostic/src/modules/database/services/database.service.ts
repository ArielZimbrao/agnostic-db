import { Injectable } from '@nestjs/common';
import { getConnectionManager } from 'typeorm';
import { LogService } from '../../log/services/log.service';
import { LogDto } from '../../log/dto/log.dto';

const bancos = [
    {
        id: 1,
        name: 'primaria',
        type: 'postgres',
        online: false,
    },
    {
        id: 2,
        name: 'secundaria',
        type: 'mysql',
        online: false,
    },
];

@Injectable()
export class DatabaseService {
    constructor(private readonly logService: LogService) {}

    async alter(sql) {
        let result;

        for (const db of bancos) {
            try {
                const connect = getConnectionManager().get(db.name);

                if (!db.online) {
                    db.online = true;
                    await this.resynchronize(db);
                }

                result = await connect.query(sql);
            } catch (err) {
                db.online = false;
                const log = new LogDto();
                log.dbs = db.id;
                log.date = new Date();
                log.sql = sql;
                this.logService.saveLog(log);
            }
        }

        return result;
    }

    async consult(sql) {
        let result;

        for (const db of bancos) {
            try {
                const connect = getConnectionManager().get(db.name);

                if (!db.online) {
                    db.online = true;
                    await this.resynchronize(db);
                }

                result = await connect.query(sql);

                return result;
            } catch (err) {
                db.online = false;
            }
        }

        return null;
    }

    async resynchronize(db) {
        let regis = await this.logService.findAll(db.id);
        regis = regis.sort( (a, b) => {
            if (a.date.getTime() >= b.date.getTime()) {
                return 1;
            }

            if (a.date.getTime() < b.date.getTime()) {
                return -1;
            }
            return 0;
        });

        const connect = getConnectionManager().get(db.name);
        for (const r of regis) {
            try {
                const result = await connect.query(r.sql);

                this.logService.remove(r);
            } catch (err) {}
        }
      }
}