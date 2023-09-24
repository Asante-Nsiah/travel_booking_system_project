import {Entity, PrimaryGeneratedColumn,Column, ManyToOne,OneToMany,} from 'typeorm';
import { Category } from './category-entity';
import { Users } from './users-entity';
import { CartItem } from './cart-item-entity';
  
  @Entity('booking_offers')
  export class BookingOffer {
    @PrimaryGeneratedColumn()
    offerID: number;
  
    @ManyToOne(() => Category, (category) => category.bookingOffers)
    category: Category;
  
    @ManyToOne(() => Users, (user) => user.bookingOffers)
    businessUser: Users;
  
    @Column({ type: 'varchar', length: 255 })
    name: string;
  
    // Add other common fields here
  
    @OneToMany(() => CartItem, (cartItem) => cartItem.offer)
    cartItems!: CartItem[];

    constructor(){
        this.offerID = 0;
        this.category = new Category();
        this.businessUser = new Users();
        this.name = '';
    }
  }