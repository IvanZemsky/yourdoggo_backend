import productService from "../services/productService.js"

class ProductController {
   async getAll(req, res) {
      try {
         const products = await productService.getAll()
         return res.json(products)
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