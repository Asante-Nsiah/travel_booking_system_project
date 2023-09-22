import { Entity, PrimaryGeneratedColumn, OneToOne, JoinColumn, OneToMany } from 'typeorm';
import { Users } from './users-entity';
import { CartItem } from './cart-item-entity';

@Entity('guest_carts')
export class GuestCart {
  @PrimaryGeneratedColumn()
  cartID: number;

  @OneToOne(() => Users)
  @JoinColumn()
  user!: Users;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart)
  cartItems: CartItem[];

  constructor(){
    this.cartID = 0;
    this.cartItems = [];
  }
}