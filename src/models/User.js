import { Schema, model } from "mongoose";

const User = new Schema({
   login: {type: String, require: true, unique: true},
   password: {type: String, require: true},
   name: {type: String},
   surname: {type: String},
   hasCard: {type: Boolean, require: true},
   email: {type: String},
   phone: {type: String},
   registrationDate: {type: Date},
   postOfficeAddress: {type: String},
})

export default model('User', User)