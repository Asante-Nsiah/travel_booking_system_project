// import { EntityRepository, Repository } from 'typeorm';
// import { GuestCart } from '../models/guest-entity';

// @EntityRepository(GuestCart)
// export class GuestCartRepository extends Repository<GuestCart> {
 
//   async getValidCartID(): Promise<number | undefined> {
   
//     // This is just a placeholder logic, and you should replace it with your actual logic
//     const validCart = await this.createQueryBuilder('guestCart')
//       .leftJoinAndSelect('guestCart.cartItems', 'cartItem')
//       .where('cartItem.quantity > 0') 
//       .getOne();

//     if (validCart) {
//       return validCart.cartID;
//     } else {
//       return undefined; // No valid cart found
//     }
//   }

  
// }
import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../models/users-entity';
import { GuestCart } from '../models/guest-entity';

@EntityRepository(GuestCart)
export class GuestCartRepository extends Repository<GuestCart> {
  async findOrCreateCartForUser(user: Users): Promise<number> {
    // Check if the user already has a cart associated with them
    const existingCart = await this.findOne({ where: { user: { userID: user.userID } }  });

    if (existingCart) {
      // If the user already has a cart, return its cartID
      return existingCart.cartID;
    } else {
      // If the user doesn't have a cart, create a new one and return its cartID
      const newCart = this.create({ user });
      await this.save(newCart);
      return newCart.cartID;
    }
  }
}
