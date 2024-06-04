import Product from '../models/Product.js'

class ProductService {
   async getAll(params) {
      const limit = +params.limit || 0
      const page = +params.page || 1
      const query = {};
      
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

      if (params.excludeId) {
         query._id = {$ne: params.excludeId}
      }

      const products = await Product.find(query).limit(limit).skip((page - 1) * limit);

      const totalCount = await Product.countDocuments(query);

      return {products, totalCount};
   }

   async getById(id) {
      const product = await Product.findById(id);
      return product
   }

   async getByCategory(category, params) {
      const query = {}

      query.category = category

      if (params.excludeId) {
         query._id = {$ne: params.excludeId}
      }

      const products = await Product.find(query);
      return products
   }

   async getByIds(ids) {
      const products = await Product.find({ _id: { $in: ids } });
      return products;
   }
}

export default new ProductService()