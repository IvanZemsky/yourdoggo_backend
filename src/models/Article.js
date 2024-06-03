import { Schema, model } from "mongoose";

const Article = new Schema({
   title: { type: String, require: true },
   imgLink: { type: String, require: true },
   tags: { type: [String], default: [] },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
   datetime: {type: Date, require: true, default: new Date()},
   text: {type: String, require: true},
   likes: {type: Number, default: 0}
}, {versionKey: false});


export default model('Article', Article)