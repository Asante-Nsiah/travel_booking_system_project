import { Request, Response, NextFunction } from "express";
import { logger } from "../route/logger";
import { CartItem } from "../models/cart-item-entity";
import { AppDataSource } from "../route/data-source";
import { GuestCart } from "../models/guest-entity";
import { BookingOffer } from "../models/booking-offer-entitiy";

const connection = AppDataSource;

// export const addCart = async (request: Request, response: Response) => {
//     try {
//       const { guestCartId, bookingOfferId, quantity } = request.body;
  
//       // Get the GuestCart and BookingOffer entities from the database
//       const guestCartRepository = connection.getRepository(GuestCart);
//       const bookingOfferRepository = connection.getRepository(BookingOffer);
  
//       // Initialize guestCart and bookingOffer as null
//       let guestCart: GuestCart | null = null;
//       let bookingOffer: BookingOffer | null = null;
  
//       // Check if guestCartId and bookingOfferId are provided
//       if (guestCartId) {
//         guestCart = (await guestCartRepository.findOne(guestCartId)) as GuestCart;
//       }
  
//       if (bookingOfferId) {
//         bookingOffer = (await bookingOfferRepository.findOne(
//           bookingOfferId
//         )) as BookingOffer;
//       }
  
//       // Create or update the CartItem using the CartItemRepository
//       const cartItemRepository = connection.getRepository(CartItem);
//       const existingCartItem = await cartItemRepository.findOne({
//         where: {
//           cart: { cartID: guestCart?.cartID },
//           offer: { offerID: bookingOffer?.offerID },
//         },
//       });
  
//       if (existingCartItem) {
//         // If the item already exists in the cart, update the quantity
//         existingCartItem.quantity += quantity;
//         await cartItemRepository.save(existingCartItem);
//       } else {
//         // If the item doesn't exist, create a new CartItem
//         const cartItem = new CartItem();
//         cartItem.cart = guestCart || new GuestCart();
//         if (bookingOffer) {
//           cartItem.offer = bookingOffer; // Set the offer property if bookingOffer exists
//         }
//         cartItem.quantity = quantity;
//         await cartItemRepository.save(cartItem);
//       }
  
//       response.status(200).json({ message: "Item added to cart successfully" });
//     } catch (error) {
//       console.error("Error adding item to cart:", error);
//       response
//         .status(500)
//         .json({ error: "An error occurred while adding the item to the cart" });
//     }
//   };
  

export const addCart = async (request: Request, response: Response) => {
    try {
      const { guestCartId, quantity } = request.body;
  
      // Get the GuestCart entity from the database
      const guestCartRepository = connection.getRepository(GuestCart);
  
      // Initialize guestCart as null
      let guestCart: GuestCart | null = null;
  
      // Check if guestCartId is provided
      if (guestCartId) {
        guestCart = (await guestCartRepository.findOne(guestCartId)) as GuestCart;
      }
  
      // Create or update the CartItem using the CartItemRepository
      const cartItemRepository = connection.getRepository(CartItem);
      const existingCartItem = await cartItemRepository.findOne({
        where: {
          cart: { cartID: guestCart?.cartID },
        },
      });
  
      if (existingCartItem) {
        // If the item already exists in the cart, update the quantity
        existingCartItem.quantity += 1;
        await cartItemRepository.save(existingCartItem);
      } else {
        // If the item doesn't exist, create a new CartItem
        const cartItem = new CartItem();
        cartItem.cart = guestCart || new GuestCart();
        cartItem.quantity = quantity;
        await cartItemRepository.save(cartItem);
      }
  
      response.status(200).json({ message: "Item added to cart successfully" });
    } catch (error) {
      console.error("Error adding item to cart:", error);
      response
        .status(500)
        .json({ error: "An error occurred while adding the item to the cart" });
    }
  };
  

export const addCartDisplay = async (request: Request, response: Response) => {
  try {
    // Fetch the categories data (replace with your actual logic)
   const {categories} = request.body

    // Render the "cart" view with the categories data
    response.render('cart', { categories });
  } catch (error) {
    console.error('Error rendering cart:', error);
  }
};
