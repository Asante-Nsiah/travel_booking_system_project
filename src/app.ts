import dotenv from "dotenv";

const result = dotenv.config();

if(result.error) {
  // console.log(`Error loading envirnoment variable, aborting.`);
  process.exit(1);
} 
console.log(process.env.PORT);

import express from 'express';
import { root } from './route/root';
import { isInteger } from './route/utils';
import { logger } from './route/logger';
import { AppDataSource } from "./route/data-source";


const app = express();



const setupExpress = () => {
  
    app.route("/").get(root);
   
    
    }

    const startServer = () => {
  
        let port: number = 3000;
      
        const portEnv: string | undefined = process.env.PORT,
              portArg = process.argv[2];
      
              if (portEnv !== undefined && isInteger(portEnv)) {
                port = parseInt(portEnv);
              }
      
        if (!port && isInteger(portArg)){
          port = parseInt(portArg);
        }
      
        if (!port) {
          port = 8000;
        }
      
        app.listen(port, () => {
          logger.info(`Server running on  port ${port}`);
      });
      
      }

    AppDataSource.initialize()
    .then(()=>{
      logger.info(`The datasource has been initialized successfully.`);
      setupExpress();
      startServer();
    })
    .catch(err => {
      logger.error(`Error during datasource initialization.`, err);
      process.exit(1);
    })