import { Request, Response } from "express";
import { AppDataSource } from "../route/data-source";
import { Users } from "../models/users-entity";
import bcrypt from 'bcrypt';

export const authenticateUser = async (request: Request, response: Response) => {
  try {
    const { email, password, fullName} = request.body;
    const userRepository = AppDataSource.getRepository(Users);

    // Find the user by email
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return response.json({ error: 'Incorrect email.' });
    }

    // Check if the user's account is verified
    if (!user.IsEmailVerified) {
      return response.json({ error: 'Account not verified.' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return response.json({ error: 'Incorrect password.' });
    }

    // Store the user's ID in the session upon successful login
    request.session.userId = user.userID;
    request.session.fullName = user.fullName;
    request.session.email = user.email;
    // return response.json({ message: 'Login successful.' });
    response.render('create-category', {fullName, email});
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Login failed.' });
  }
};
