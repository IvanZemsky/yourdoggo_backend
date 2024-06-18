import { Router } from "express";
import forumController from "../controllers/forumController.js"

const forumRouter = new Router()

forumRouter.get('/forum', forumController.getAll)
forumRouter.post('/forum/create', forumController.create)
forumRouter.post('/forum/comments/create', forumController.createComment)
forumRouter.get('/forum/:id/comments', forumController.getAllComments)
forumRouter.get('/forum/:id', forumController.getById)
//forumRouter.get('/forum/users/:userId', forumController.getByUserId)

export default forumRouter