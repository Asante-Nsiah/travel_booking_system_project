import express from 'express';
import { login, register } from '../controller/athCtrl';
import { registration } from '../controller/userRegistration';

const router = express.Router();

router.get('/login', login)
router.get('/register', register)
router.post('/register', registration)






export {router as Controller}