import { Request, Response} from "express";
import { Category } from "../models/category-entity";
import { AppDataSource } from "../route/data-source";
import { CategoryRepository } from "../repository/categoryRepository";

const connection = AppDataSource;

export const categoryHome = async (request: Request, response: Response) => {
    try {
        const categoriesData = connection.getRepository(Category);
        const categories = await categoriesData.find()
        response.render('home', { categories });
      } catch (error) {
        console.error('Error retrieving categories:', error);
        response.status(500).send('An error occurred.');
      }
}