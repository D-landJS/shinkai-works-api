import express from 'express';
import usersController from '../controllers/userController.js';
const router = express.Router();

router.post('/register', usersController.registerUser);
router.post('/login', usersController.loginUser);

export default router;
