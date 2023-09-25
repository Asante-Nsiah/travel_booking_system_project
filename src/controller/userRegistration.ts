import { Request, Response, NextFunction} from "express";
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { Users } from "../models/users-entity";
import nodemailer from 'nodemailer';
import { AppDataSource } from "../route/data-source";
import { getRepository } from "typeorm";
import { GuestCart } from "../models/guest-entity";



const connection = AppDataSource;
const userRepository = connection.getRepository(Users);

function validatePassword(password: string): boolean {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }




  async function checkUniqueness(username: string, email: string): Promise<boolean> {
    const existingUser = await userRepository.findOne({ where: [{ username }, { email }] });
    return !existingUser; 
  }

  async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // Number of salt rounds for bcrypt
    return bcrypt.hash(password, saltRounds);
  }

  async function generateVerificationToken(): Promise<string> {
    return uuidv4(); // Generate a random UUID
  }
  



export const registration =  async (request: Request, response: Response) => {
    try {
      const { fullName, username, email, password } = request.body;
  
       // Validate password
    if (!validatePassword(password)) {
        console.log(`Password: ${password}`);
        return response.status(400).json({ error: 'Invalid password format.' });
      }
  
      // Check uniqueness of username and email
      const isUsernameUnique = await checkUniqueness(username, email);
      if (!isUsernameUnique) {
        return response.status(400).json({ error: 'Username or email already exists.' });
      }
  
      // Hash the password
      const hashedPassword = await hashPassword(password);
  
      // Generate a verification token
      const verificationToken = await generateVerificationToken();

    
      // Save user data to the database
      const user = new Users(); 
      user.fullName = fullName;
      user.username = username;
      user.email = email;
      user.password = hashedPassword;
      user.verificationToken = verificationToken;

      await userRepository.insert(user);

     
      // Send a verification email
      await sendVerificationEmail(fullName, email, verificationToken);
  
      response.status(201).json({ message: 'Registration successful. Please check your email for verification.' });
    } catch (error) {
      console.error(error);
      response.status(500).json({ error: 'Registration failed.' });
    }
  };

  
async function sendVerificationEmail(fullName: string,email: string, verificationToken: string): Promise<void> {
    const transporter = nodemailer.createTransport({
      // Configure your email service (SMTP or other email service)
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user:  "dca4a7f2c037d4",
        pass: "ca037e584be699"
      },
    });
  
    const mailOptions = {
      from: 'demoproject369@gmail.com',
      to: email,
      subject: 'Account Verification',
      text: `Hello ${fullName},\n
      Thank you for registering on the Travel Booking System page.\n
      Click the following link to verify your account: http://localhost:3000/verify/${verificationToken}`,
    };
  
    await transporter.sendMail(mailOptions);
  }