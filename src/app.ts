import dotenv from "dotenv";

const result = dotenv.config();

if(result.error) {
  // console.log(`Error loading envirnoment variable, aborting.`);
  process.exit(1);
} 
console.log(process.env.PORT);

import "reflect-metadata";
import express from 'express';
import { root } from './route/root';
import { isInteger } from './route/utils';
import { logger } from './route/logger';
import { AppDataSource } from "./route/data-source";
import { Controller } from "./route/routing";
import path from 'path';
import session from 'express-session';
import passport from 'passport';
import initializePassport from "./config/passportConfig";



const app = express();

app.use(session({ 
  secret: process.env.SESSION_SECRET || 'defaultSecret', 
  resave: false, 
  saveUninitialized: true,
  cookie: {
    secure: false, // Set to true in production with HTTPS
  },
  }));

  app.use(passport.initialize());
  app.use(passport.session());
  
  initializePassport(passport);
  

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '..','dist', 'views'));
app.use(express.static(path.join(__dirname, '..', 'dist', 'public')));
app.use(express.static(path.join(__dirname, '..', 'dist')));
app.use(express.static(path.join(__dirname, 'dist', 'modules')));

const setupExpress = () => {
  
    app.route("/").get(root);
    app.route("/login").get(Controller);
    app.route("/register").get(Controller);
    app.route("/register").post(Controller);
    app.route("/verify/:token").get(Controller);
    app.route("/logout").post(Controller);
    app.route("/login").post(Controller);
    app.route("/main").get(Controller);
    app.route("/reset-password").get(Controller);
    app.route("/reset-password").post(Controller);
    app.route("/create-category").get(Controller);
    app.route("/create-booking-offer").post(Controller);
    app.route("/home").get(Controller);
    app.route("/add-to-cart").get(Controller);
    app.route("/add-to-cart").post(Controller);
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