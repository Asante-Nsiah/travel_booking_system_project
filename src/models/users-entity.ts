import {Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, OneToOne, JoinColumn,} from 'typeorm';
import { Transaction } from './transaction.entity';
import { BookingOffer } from './booking-offer-entitiy';
import { GuestCart } from './guest-entity';
import { SavedCard } from './saved-card-entity';
  
  @Entity('users')
  export class Users {
    @PrimaryGeneratedColumn()
    userID: number;
  
    @Column({ type: 'varchar', length: 255 })
    fullName: string;
  
    @Column({ type: 'varchar', length: 100, unique: true })
    username: string;
  
    @Column({ type: 'varchar', length: 255, unique: true })
    email: string;
  
    @Column({ type: 'varchar', length: 255 })
    password: string;
  
    @Column({ type: 'boolean', default: false })
    IsEmailVerified: boolean;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    GoogleAuthID: string | null;
  
    @Column({ type: 'varchar', length: 255, nullable: true })
    FacebookAuthID: string | null;

    @Column({ type: 'varchar', length: 255, nullable: true })
    verificationToken: string | null;
  
    @OneToMany(() => BookingOffer, (bookingOffer) => bookingOffer.businessUser)
    bookingOffers!: BookingOffer[];
  
    @OneToMany(() => SavedCard, (savedCard) => savedCard.User)
    savedCards!: SavedCard[];
  
    @OneToMany(() => Transaction, (transaction) => transaction.User)
    transactions!: Transaction[];
  
    @OneToOne(() => GuestCart, (guestCart) => guestCart.user, { cascade: true })
    @JoinColumn()
    GuestCart: GuestCart;

    constructor() {
        this.userID = 0; 
        this.fullName = '';
        this.username = '';
        this.email = '';
        this.password = '';
        this.IsEmailVerified = false;
        this.GoogleAuthID = null;
        this.FacebookAuthID = null;
        this.verificationToken = null;
        this.GuestCart = new GuestCart();
      }
  }