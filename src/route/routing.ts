import express from 'express';
import { login, register } from '../controller/athCtrl';
import { registration } from '../controller/userRegistration';
import { verification } from '../controller/userVerification';

const router = express.Router();

router.get('/login', login)
router.get('/register', register)
router.post('/register', registration)
router.get('/verify/:token', verification)





export {router as Controller}