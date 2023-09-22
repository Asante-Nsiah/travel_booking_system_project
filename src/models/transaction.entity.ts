import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users-entity';

@Entity('transactions')
export class Transaction {
  @PrimaryGeneratedColumn()
  TransactionID: number;

  @ManyToOne(() => Users, (user) => user.transactions)
  User!: Users;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  TotalAmount: number;

  @Column({ type: 'timestamp' })
  Date: Date;


  constructor() {
    this.TransactionID = 0;
    this.TotalAmount = 0.0; 
    this.Date = new Date(); 
  }
}