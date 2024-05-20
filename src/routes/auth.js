import { Router } from 'express';
import authController from "../controllers/authController.js";

const authRouter = new Router()

authRouter.post('/auth/registration', authController.create)
authRouter.post('/auth/login', authController.login)

export default authRouter