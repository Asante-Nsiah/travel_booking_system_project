import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users-entity';

@Entity('saved_cards')
export class SavedCard {
  @PrimaryGeneratedColumn()
  cardID: number;

  @ManyToOne(() => Users, (user) => user.savedCards)
  User!: Users;

  @Column({ type: 'varchar', length: 255 })
  cardholderName: string;

  @Column({ type: 'varchar', length: 255 })
  cardNumber: string;

  @Column({ type: 'varchar', length: 7 })
  expirationDate: string;

  constructor(){
    this.cardID = 0;
    this.cardholderName = '';
    this.cardNumber = '';
    this.expirationDate = '';
  }
}