import { Request, Response} from "express";
import bcrypt from "bcrypt";
import { AppDataSource } from "../route/data-source";
import { Users } from "../models/users-entity";



export const setNewPassword = async (request: Request, response: Response) =>{
    try {
        const { email, oldPassword, newPassword, confirmPassword } = request.body;
    
        // Check if newPassword matches confirmPassword
        if (newPassword !== confirmPassword) {
          return response.status(400).json({ error: 'New password and confirm password do not match.' });
        }
    
        // Query the database to find the user by email
        const userRepository = AppDataSource.getRepository(Users);;
        const user = await userRepository.findOne({ where: { email } });
    
        // Check if the user exists and if the old password matches
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
          return response.status(401).json({ error: 'Invalid email or old password.' });
        }
    
        // Hash the newPassword
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    
        // Update the user's password in the database
        user.password = hashedNewPassword;
        await userRepository.save(user);
    
        // Send a success response
        response.status(200).json({ message: 'Password reset successful.' });
      } catch (error) {
        console.error(error);
        response.status(500).json({ error: 'Password reset failed.' });
      }
}