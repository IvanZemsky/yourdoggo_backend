import Product from '../models/Product.js'

class ProductService {
   async getAll() {
      const products = await Product.find();
      return products
   }

   async getById(id) {
      const product = await Product.findById(id);
      return product
   }

   async getByCategory(category) {
      const products = await Product.find({category});
      console.log(category)
      return products
   }
}

export default new ProductService()