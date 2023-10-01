import { EntityRepository, Repository } from 'typeorm';
import { Category } from '../models/category-entity';


@EntityRepository(Category)
export class CategoryRepository extends Repository<Category> {
  async saveCategory(categoryData: Category): Promise<Category> {
    const category = new Category();
    category.name = categoryData.name;
    category.location = categoryData.location;
    category.code = categoryData.code;
    category.image = categoryData.image;
   category.accommodationCapacity = categoryData.accommodationCapacity;
   category.accommodationType = categoryData.accommodationType;
   category.roomType = categoryData.roomType;
   category.price = categoryData.price;
   category.carType = categoryData.carType;
   categoryData.date = categoryData.date;
   category.cityOfDepature = categoryData.cityOfDepature;
   category.cityOfDestination = categoryData.cityOfDestination;

    try {
      return await this.save(category);
    } catch (error) {
      throw error;
    }
  }

  async findCategories(): Promise<Category[]> {
    try {
      return await this.find(); // Find all categories
    } catch (error) {
      throw error;
    }
  }


}



















