import express from 'express';
import { login, register } from '../controller/athCtrl';

const router = express.Router();

router.get('/login', login)
router.get('/register', register)






export {router as Controller}