import { Router } from "express";
import articleController from "../controllers/articleController.js"

const articleRouter = new Router()

articleRouter.post('/articles/create', articleController.create)
articleRouter.post('/articles', articleController.getAll)
articleRouter.post('/articles/likes', articleController.toggleLike) // Перемещен выше для избежания конфликта
articleRouter.post('/articles/:id', articleController.getById)
articleRouter.get('/articles/users/:userId', articleController.getByUserId)

export default articleRouter