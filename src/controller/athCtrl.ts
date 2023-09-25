import { Request, Response, NextFunction} from "express";
import { logger } from "../route/logger";
import passport from "passport";



export  const login = (request: Request, response: Response) => {
    try {
        response.render("login");
    } catch (error) {
        logger.error('Error rendering login view:', error);
        response.status(500).send('Internal Server Error');
    }
};

export  const register = (request: Request, response: Response) => {
    try {
        response.render("registration");
    } catch (error) {
        logger.error('Error rendering login view:', error);
        response.status(500).send('Internal Server Error');
    }
};
export  const resetPassword = (request: Request, response: Response) => {
    try {
        response.render("reset-password");
    } catch (error) {
        logger.error('Error rendering reset-password:', error);
        response.status(500).send('Internal Server Error');
    }
};

export  const logout = (request: Request, response: Response) => {
    try {
        request.session.destroy((err) => {
            if (err) {
              console.error(err);
              return response.status(500).json({ error: 'Logout failed.' });
            }
            // Redirect to a "Logged Out" page or send a success response
            response.redirect('/login');
          });
    } catch (error) {
        logger.error('Error rendering login view:', error);
        response.status(500).send('Internal Server Error');
    }
};


  // Login authentication middleware
export const loginAuthentication = passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/main'
  });

  export const mainPage = (request: Request, response: Response) => {
    // Successful login
    response.render('main-page'); // Render the main page template
  };

  export function isAuthenticated(request: Request, response: Response, next: NextFunction) {
    if (request.isAuthenticated()) {
      return next();
    }
    response.redirect('/login'); // Redirect to the login page if not authenticated
  }