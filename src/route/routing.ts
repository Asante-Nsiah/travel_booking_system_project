import express from 'express';
import { login, loginAuthentication, logout, register, isAuthenticated, mainPage, resetPassword } from '../controller/athCtrl';
import { registration } from '../controller/userRegistration';
import { verification } from '../controller/userVerification';
import { authenticateUser } from '../controller/authenticateUser';

const router = express.Router();

router.get('/login', login)
router.get('/register', register)
router.post('/register', registration)
router.get('/verify/:token', verification)
router.post('/logout', logout)
router.post('/login', authenticateUser)
router.get('/main', isAuthenticated, mainPage )
router.get('/reset-password', resetPassword)



export {router as Controller}