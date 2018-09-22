import { Injectable } from '@nestjs/common';
import { User } from '../entity/user.entity';
import { DatabaseService } from '../../database/services/database.service';

@Injectable()
export class UserService {
    constructor(private readonly databaseService: DatabaseService) {}

    async saveUser(user: User) {
        const sql = `
        INSERT INTO usuario
        (nome) VALUES ('${user.name}')`;

        this.databaseService.alter(sql);
    }
}