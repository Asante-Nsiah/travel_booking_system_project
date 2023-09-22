import { Request, Response, NextFunction} from "express";
import { logger } from "../route/logger";



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