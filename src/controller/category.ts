import { Request, Response, NextFunction} from "express";
import { logger } from "../route/logger";


export  const category = (request: Request, response: Response) => {
    try {
        response.render("create-category");
    } catch (error) {
        logger.error('Error rendering Category:', error);
        response.status(500).send('Internal Server Error');
    }
};