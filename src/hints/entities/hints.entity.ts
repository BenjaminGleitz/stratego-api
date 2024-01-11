// Clément ROLLIN
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('hints')
export class Hint {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date_played: Date;

  @Column()
  winning_layout: string;

  @Column()
  win_lose: string;
}