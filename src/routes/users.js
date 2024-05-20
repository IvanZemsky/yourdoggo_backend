import { Router } from "express";
import userController from '../controllers/userController.js'

const userRouter = new Router()

userRouter.get('/users', userController.getAll)
userRouter.get('/users/:id', userController.getById)

export default userRouter