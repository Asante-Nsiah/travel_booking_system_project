import {Response, Request} from "express";
import { logger } from "./logger";

export const root = (request: Request, response: Response ) => {
    response.status(200).send('The booking system project v4 is live and running');
    console.log('Typescript');
   
}