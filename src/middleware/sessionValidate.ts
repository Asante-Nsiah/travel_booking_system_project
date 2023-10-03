import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm'; // You may need to adjust this import
import { Users } from '../models/users-entity'; // Import your User entity/model
import { AppDataSource } from '../route/data-source';

const connection = AppDataSource;

export const sessionValidation = async (request: Request, response: Response, next: NextFunction) => {
  try {
    // Get the sessionId from the user's session
    const userSessionId = request.body.sessionId;

    // Find the user in the database based on the sessionId
    const userRepository = connection.getRepository(Users); // Adjust this based on your setup
    const user = await userRepository.findOne({ where: { sessionId: userSessionId } });

    if (!user) {
      // If the user is not found or the sessionId doesn't match, respond with an error
      return response.status(401).json({ error: 'Unauthorized access. Please log in.' });
    }

    // User is authenticated, proceed to the next middleware or route
    next();
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Session validation failed.' });
  }
};
