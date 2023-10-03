import { Request, Response, NextFunction} from "express";
import { logger } from "../route/logger";
import { AppDataSource } from "../route/data-source";
import { Category } from "../models/category-entity";
import { UserRepository } from "../repository/userRepository";
import { Users } from "../models/users-entity";
import { CategoryRepository } from "../repository/categoryRepository";

const connection = AppDataSource;
const userRepository = connection.getRepository(Users);

export  const category = (request: Request, response: Response) => {
    try {
        const googleApiKey = process.env.GOOGLE_API_KEY;
        response.render("create-category", {googleApiKey});
    } catch (error) {
        logger.error('Error rendering Category:', error);
        response.status(500).send('Internal Server Error');
    }
};

type CategoryToCode = {
    accommodation: string;
    hotel: string;
    flight: string;
    car_rental: string;
};


export const bookCategory = async (request: Request, response: Response) =>{

    try {
        const selectedCategory: keyof CategoryToCode = request.body.category as keyof CategoryToCode;
    
        // Create a new instance of your TypeORM entity
        const newBookingCategory = new Category();
    
        // Declare categoryToCode
        const categoryToCode: CategoryToCode = {
          accommodation: '001',
          hotel: '002',
          flight: '003',
          car_rental: '004',
        };
    
        // Assign values from the form data to the entity properties
        newBookingCategory.code = categoryToCode[selectedCategory];
        newBookingCategory.name = request.body.name;
        newBookingCategory.location = request.body.location;
        newBookingCategory.accommodationType = request.body.accommodationType;
        newBookingCategory.accommodationCapacity = request.body.accommodationCapacity;
        newBookingCategory.roomType = request.body.roomType;
        newBookingCategory.price = request.body.price;
        newBookingCategory.cityOfDepature = request.body.cityOfDeparture;
        newBookingCategory.cityOfDestination = request.body.cityOfDestination;
        newBookingCategory.date = request.body.date;
        newBookingCategory.carType = request.body.carType;
        newBookingCategory.image = request.body.image;
        
        // Get the custom repository instance
        const categoryRepository = connection.getRepository(Category);
    
        // Save the entity to the database using the repository
        await categoryRepository.save(newBookingCategory);

        const categories = await categoryRepository.find({
            order: {
              createdAt: 'DESC', 
            },
          });
    
        // Redirect to a success page or respond with a success message
        response.status(201).json({ message: 'Category booking successful.' });
      } catch (error) {
        // Handle errors (e.g., validation errors, database errors)
        console.error(error);
        response.status(500).send('An error occurred.');
      }
}