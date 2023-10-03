import { Request, Response} from "express";
import { Category } from "../models/category-entity";
import { AppDataSource } from "../route/data-source";
import { CategoryRepository } from "../repository/categoryRepository";
import { Users } from "../models/users-entity";
import { UserRepository } from "../repository/userRepository";

const connection = AppDataSource;
const userRepository = connection.getRepository(Users);

export const categoryHome = async (request: Request, response: Response) => {
    try {
        const {fullName, email} = request.session;
        
        const guestCartId = request.body;
        const bookingOfferId = request.body;

        const categoriesData = connection.getRepository(Category);
        const categories = await categoriesData.find()

       
        
      

        response.render('home', { categories, guestCartId, bookingOfferId, email, fullName});
      } catch (error) {
        console.error('Error retrieving categories:', error);
        response.status(500).send('An error occurred.');
      }
}