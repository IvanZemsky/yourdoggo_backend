import productService from "../services/productService.js"

class ProductController {
   async getAll(req, res) {
      try {
         const products = await productService.getAll(req.query)
         return res.json(products)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getById(req, res) {
      try {
         const product = await productService.getById(req.params.id)
         return res.json(product)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getByCategory(req, res) {
      try {
         const products = await productService.getByCategory(req.params.category)
         return res.json(products)
      } catch (e) {
         res.status(500).json(e)
      }
   }
}

export default new ProductController()