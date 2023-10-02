import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { BookingOffer } from './booking-offer-entitiy';
import { GuestCart } from './guest-entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  cartItemID: number;

  @ManyToOne(() => GuestCart, (guestCart) => guestCart.cartItems)
  cart: GuestCart;

  @ManyToOne(() => BookingOffer, (bookingOffer) => bookingOffer.cartItems)
  offer: BookingOffer;

  @Column({ type: 'int', default: 0 })
  quantity: number;

  constructor(){
    this.cartItemID = 0;
    this.cart = new GuestCart();
    this.offer = new BookingOffer();
    this.quantity = 0;
  }
}