import { Schema, model } from "mongoose";

const Product = new Schema({
   name: {type: String, require: true},
   description: {type: String, require: true},
   category: {type: String, require: true},
   price: {type: Number, require: true}
})

export default model('Product', Product)