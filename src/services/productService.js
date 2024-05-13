import Product from '../models/Product.js'

class ProductService {
   async getAll(params) {
      let query = {};
      
      if (params.search) {
         const searchString = params.search;
         query.$or = [
            { description: { $regex: searchString, $options: 'i' } },
            { name: { $regex: searchString, $options: 'i' } }
         ];
      }

      if (params.category) {
         query.category = params.category;
      }
      
      if (params.minPrice || params.maxPrice) {
         query.price = {};
         if (params.minPrice) {
            query.price.$gte = +params.minPrice;
         }
         if (params.maxPrice) {
            query.price.$lte = +params.maxPrice;
         }
      }

      const products = await Product.find(query);
      return products;
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