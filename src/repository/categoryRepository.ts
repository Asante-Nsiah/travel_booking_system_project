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
}



















// @EntityRepository(Category)
// export class CategoryRepository extends Repository<Category> {
//   static save(newBookingCategory: Category) {
//       throw new Error("Method not implemented.");
//   }
//   async createCategory(
//     name: string,
//     code: string,
//     categoryID: number,
//     accommodationType: string,
//     accommodationCapacity: string,
//     roomType: string,
//     location: string,
//     price: number,
//     cityOfDeparture: string,
//     cityOfDestination: string,
//     date: Date,
//     carType: string,
//     // Add other parameters based on your entity properties
//   ): Promise<Category> {
//     const category = new Category();
//     category.name = name;
//     category.code = code;
//     category.categoryID = categoryID;
//     category.accommodationCapacity = accommodationCapacity;
//     category.accommodationType = accommodationType;
//     category.roomType = roomType;
//     category.location = location;
//     category.price = price;
//     category.cityOfDepature = cityOfDeparture;
//     category.cityOfDestination = cityOfDestination;
//     category.date = date;
//     category.carType = carType;
    
//     await category.save();
//     return category;
//   }

// //   async findCategoryById(id: number): Promise<Category | undefined> {
// //     return await this.findOne(id);
// //   }

//   // Add more custom repository methods as needed
// }
