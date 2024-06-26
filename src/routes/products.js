import { Router } from "express";
import productController from "../controllers/productController.js";

const productRouter = new Router()

productRouter.get('/products', productController.getAll)
productRouter.get('/products/categories/:category', productController.getByCategory)
productRouter.get('/products/:id', productController.getById)
productRouter.post('/products', productController.getByIds)

export default productRouter