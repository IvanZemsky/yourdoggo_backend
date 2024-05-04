import Product from '../models/Product.js'

class ProductService {
   async getAll() {
      const products = await Product.find();
      return products
   }

   async getByCategory(category) {
      const products = await Product.find({category});
      console.log(category)
      return products
   }
}

export default new ProductService()