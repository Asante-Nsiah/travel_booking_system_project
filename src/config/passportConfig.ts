import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Users } from '../models/users-entity';
import bcrypt from 'bcrypt';
import { AppDataSource } from '../route/data-source';

const connection = AppDataSource;
const userRepository = connection.getRepository(Users);

// Function to authenticate a user
const authenticateUser = async (email: string, password: string, done: any) => {
  try {
    // Find the user by email
    const user = await userRepository.findOne({ where: { email } });

    if (!user) {
      return done(null, false, { message: 'Incorrect email.' });
    }

    // Check if the user's account is verified
    if (!user.IsEmailVerified) {
      return done(null, false, { message: 'Account not verified.' });
    }

    // Check the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    done(error, null);
  }
};

export default function initializePassport(passport: any) {
  passport.use(
    new LocalStrategy({ usernameField: "email", passwordField: "password" }, authenticateUser)
  );

  passport.serializeUser((user: any, done: (arg0: null, arg1: number) => void) => {
    done(null, user.userID);
  });

  passport.deserializeUser(async (id: number, done: (arg0: unknown, arg1: Users | null) => void) => {
    try {
      const user = await userRepository.findOne({ where: { userID: id } });
      if (!user) {
        return done(new Error('User not found'), null);
      }
      return done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
}
