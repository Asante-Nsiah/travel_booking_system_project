import { Request, Response} from "express";
import { AppDataSource } from "../route/data-source";
import { Users } from "../models/users-entity";
import { GuestCart } from "../models/guest-entity";


export const verification = async (request: Request, response: Response) => {
    try {
        const { token } = request.params;
        const connection = AppDataSource;
        const userRepository = connection.getRepository(Users);
        // Find the user with the matching verification token
        const user = await userRepository.findOne({ where: { verificationToken: token } });
        
        if (!user) {
          // Token not found or user already verified
          return response.status(400).json({ error: 'Invalid verification token.' });
        }
        
        // Mark the user as verified and clear the verification token
        user.IsEmailVerified = true;
        user.verificationToken = null;
        
        // Save the updated user
        await userRepository.save(user);

         // Create a GuestCart for the verified user
        const guestCartRepository = connection.getRepository(GuestCart);
        const guestCart = new GuestCart(user);
        await guestCartRepository.save(guestCart);
        
        // Redirect to a "Verification Successful" page or send a success response
        return response.redirect('/login');
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Verification failed.' });
      }
}