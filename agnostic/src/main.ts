import { NestFactory } from '@nestjs/core';
import { AppModule } from 'modules/app.module';
import {createConnections} from 'typeorm';
import { User } from 'modules/user/entity/user.entity';

const entity = [
  User,
];

createConnections([{
    name: 'primaria',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '173426',
    database: 'agnostic',
    entities: entity,
    logging: true,
}, {
    name: 'secundaria',
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '173426',
    database: 'agnostic',
    entities: entity,
    logging: true,
}]);

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(5000);
}
bootstrap();
