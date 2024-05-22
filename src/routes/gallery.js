import { Router } from "express";
import galleryController from "../controllers/galleryController.js"

const galleryRouter = new Router()

galleryRouter.get('/gallery', galleryController.getAll)
galleryRouter.get('/gallery/:id', galleryController.getById)
galleryRouter.get('/gallery/users/:userId', galleryController.getByUserId)

export default galleryRouter