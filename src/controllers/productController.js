import productService from "../services/productService.js"

class ProductController {
   async getAll(req, res) {
      try {
         const {products, totalCount} = await productService.getAll(req.query)
         res.set('X-Total-Count', totalCount);
         
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
         const products = await productService.getByCategory(req.params.category, req.query)
         return res.json(products)
      } catch (e) {
         res.status(500).json(e)
      }
   }

   async getByIds(req, res) {
      try {
         const products = await productService.getByIds(req.body.ids)
         return res.json(products)
      } catch (e) {
         res.status(500).json(e)
      } 
   }
}

export default new ProductController()