import { Request, Response } from "express";
import { AppDataSource } from "../route/data-source";
import { Users } from "../models/users-entity";
import bcrypt from 'bcrypt';

export const authenticateUser = async (request: Request, response: Response) => {
  try {
    const { email, password } = request.body;
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

    // return response.json({ message: 'Login successful.' });
    response.render('main-page');
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Login failed.' });
  }
};
