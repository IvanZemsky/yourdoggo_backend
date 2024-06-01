import { Schema, model } from "mongoose";

const Article = new Schema({
   title: { type: String },
   imgLink: { type: String, require: true },
   tags: { type: [String] },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
   datetime: {type: Date, require: true},
   text: {type: String},
   likes: {type: Number, default: 0}
});


export default model('Article', Article)