import { EntityRepository, Repository } from 'typeorm';
import { Users } from '../models/users-entity';

@EntityRepository(Users)
export class UserRepository extends Repository<Users> {
    static findOne(arg0: { where: ({ username: string; } | { email: string; })[]; }) {
        throw new Error("Method not implemented.");
    }

    // Method to create a new user
  async createUser(newUser: Users): Promise<Users> {
    return this.save(newUser);
  }
 
   // Method to find a user by email
   async findByEmail(email: string): Promise<Users | null> {
    const user = await this.findOne({where: {email} });
    return user || null; 
  }

 
  // Method to find a user by username
  async findByUsername(username: string): Promise<Users | null> {
    const user = await this.findOne({ where: {username} });
    return user || null; 
  }
  async findById(userID: number): Promise<Users | null> {
    const user = await this.findOne({ where: {userID} });
    return user || null; 
  }
  
  async findByVerificationToken(verificationToken: string): Promise<Users | null> {
    const user = await this.findOne({ where: { verificationToken } });
    return user || null;
  }

  // Method to get user email and full name by email
  async getUserInfoByEmail(email: string): Promise<{ email: string; fullName: string } | null> {
    const user = await this.findOne({
      select: ['email', 'fullName'], // Select the email and full name columns
      where: { email },
    });

    if (user) {
      // Extract the email and full name from the user entity
      const { email, fullName } = user;
      return { email, fullName };
    }

    return null;
  }

 
}