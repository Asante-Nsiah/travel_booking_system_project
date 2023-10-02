import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn } from 'typeorm';
import { BookingOffer } from './booking-offer-entitiy';

@Entity('categories')
export class Category {
  save() {
      throw new Error('Method not implemented.');
  }
  @PrimaryGeneratedColumn()
  categoryID: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'text' })
  accommodationType: string;

  @Column({ type: 'text' })
  location: string;

  @Column({ type: 'text' })
  accommodationCapacity: string;

  @Column({ type: 'text' })
  price: number;

  @Column({ type: 'text' })
  roomType: string;

  @Column({ type: 'text' })
  cityOfDepature: string;

  @Column({ type: 'text' })
  cityOfDestination: string;

  @Column({ type: 'text' })
  date: Date;

  @Column({ type: 'text' })
  carType: string;

  @Column({ type: 'varchar', length: 50 })
  code: string;

  @Column({ type: 'varchar', length: 255 })
  image: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => BookingOffer, (bookingOffer) => bookingOffer.category)
  bookingOffers!: BookingOffer[];

  constructor(){
    this.categoryID = 0;
    this.name = '';
    this.location = '';
    this.code = '';
    this.image = '';
    this.accommodationType = '';
    this.accommodationCapacity = '';
    this.roomType = '';
    this.cityOfDepature = '';
    this.cityOfDestination = '';
    this.date = new Date();
    this.carType = '';
    this.price = 0;
    this.createdAt = new Date();

  }
}