import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rindegastino {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  birthdate: string;
}