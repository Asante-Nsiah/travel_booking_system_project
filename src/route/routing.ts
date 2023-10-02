import express from 'express';
import { login, loginAuthentication, logout, register, isAuthenticated, mainPage, resetPassword } from '../controller/athCtrl';
import { registration } from '../controller/userRegistration';
import { verification } from '../controller/userVerification';
import { authenticateUser } from '../controller/authenticateUser';
import { setNewPassword } from '../controller/resetPassword';
import { bookCategory, category } from '../controller/category';
import { categoryHome } from '../controller/categoryHome';
import { addCart, addCartDisplay } from '../controller/addToCart';

const router = express.Router();

router.get('/login', login)
router.get('/register', register)
router.post('/register', registration)
router.get('/verify/:token', verification)
router.post('/logout', logout)
router.post('/login', authenticateUser)
router.get('/main', isAuthenticated, mainPage )
router.get('/reset-password', resetPassword)
router.post('/reset-password', setNewPassword)
router.get('/create-category',isAuthenticated, category)
router.post('/create-booking-offer', bookCategory)
router.get('/home', categoryHome)
router.post('/add-to-cart', addCart)
router.get('/add-to-cart', addCartDisplay)



export {router as Controller}