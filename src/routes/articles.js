import { Router } from "express";
import articleController from "../controllers/articleController.js"

const articleRouter = new Router()

articleRouter.post('/articles', articleController.getAll)
articleRouter.get('/articles/:id', articleController.getById)
articleRouter.get('/articles/users/:userId', articleController.getByUserId)
articleRouter.post('/articles/likes', articleController.toggleLike)

export default articleRouter