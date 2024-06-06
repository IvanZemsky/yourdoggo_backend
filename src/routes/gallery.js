import { Router } from "express";
import galleryController from "../controllers/galleryController.js"

const galleryRouter = new Router()

galleryRouter.post('/gallery/create', galleryController.create)
galleryRouter.post('/gallery', galleryController.getAll)
galleryRouter.get('/gallery/:id', galleryController.getById)
galleryRouter.post('/gallery/likes', galleryController.toggleLike)

export default galleryRouter