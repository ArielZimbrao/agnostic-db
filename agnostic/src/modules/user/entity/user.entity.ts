import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

@Entity('usuario')
export class User extends BaseEntity {
    @PrimaryColumn()
    id: number;

    @Column({
        type: 'varchar',
        length: 50,
        name: 'nome',
    })
    name: string;
}