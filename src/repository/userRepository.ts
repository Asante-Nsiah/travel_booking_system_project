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
  
  async findByVerificationToken(verificationToken: string): Promise<Users | null> {
    const user = await this.findOne({ where: { verificationToken } });
    return user || null;
  }
 
}