import { Router } from 'express';
import userController from "./controllers/userController.js";
import userService from "./services/userService.js";

const router = new Router()

router.post('/auth/registration', userService.create)
router.post('/auth/login', userService.login)


export default router