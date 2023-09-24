import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { BookingOffer } from './booking-offer-entitiy';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  categoryID: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  icon: string;

  @OneToMany(() => BookingOffer, (bookingOffer) => bookingOffer.category)
  bookingOffers!: BookingOffer[];

  constructor(){
    this.categoryID = 0;
    this.name = '';
    this.description = '';
    this.code = '';
    this.icon = '';
    // this.bookingOffers = [];
  }
}