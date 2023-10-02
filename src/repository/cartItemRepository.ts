import { EntityRepository, Repository } from 'typeorm';
import { CartItem } from '../models/cart-item-entity';
import { GuestCart } from '../models/guest-entity';
import { BookingOffer } from '../models/booking-offer-entitiy';

@EntityRepository(CartItem)
export class CartItemRepository extends Repository<CartItem> {
  async addItemToCart(
    guestCart: GuestCart,
    bookingOffer: BookingOffer,
    quantity: number
  ): Promise<CartItem> {
    try {
      // Create a new CartItem entity
      const cartItem = new CartItem();
      cartItem.cart = guestCart;
      cartItem.offer = bookingOffer;
      cartItem.quantity = quantity;

      // Save the CartItem entity to the database
      return await this.save(cartItem);
    } catch (error) {
      throw error;
    }
  }

  async findCartItem(guestCart: GuestCart, bookingOffer: BookingOffer): Promise<CartItem | undefined> {
    try {
      // Use the 'findOne' method to find a cart item with the given guestCart and bookingOffer
      const cartItem = await this.findOne({
        where: { cart: { cartID: guestCart.cartID }, offer: { offerID: bookingOffer.offerID } },
      });

      return cartItem || undefined; // Ensure the result is 'undefined' when not found
    } catch (error) {
      throw error;
    }
  }
}
