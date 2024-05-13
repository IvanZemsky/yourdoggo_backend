import { Router } from 'express';
import userController from "../controllers/userController.js";

const authRouter = new Router()

authRouter.post('/auth/registration', userController.create)
authRouter.post('/auth/login', userController.login)

export default authRouter