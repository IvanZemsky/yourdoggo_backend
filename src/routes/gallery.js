import { Router } from "express";
import galleryController from "../controllers/galleryController.js"

const galleryRouter = new Router()

galleryRouter.get('/gallery', galleryController.getAll)
galleryRouter.get('/gallery/:id', galleryController.getById)
galleryRouter.get('/gallery/users/:userId', galleryController.getByUserId)
galleryRouter.post('/gallery/likes', galleryController.toggleLike)
galleryRouter.post('/gallery/liked', galleryController.getLiked)

export default galleryRouter