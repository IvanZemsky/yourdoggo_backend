import User from '../models/User.js'

class UserService {
   async getAll(params) {
      const query = {};
      const products = await User.find(query);
      return products;
   }

   async getById(id) {
      const product = await User.findById(id);
      return product
   }
}

export default new UserService()