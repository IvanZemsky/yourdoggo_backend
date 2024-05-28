import { Schema, model } from "mongoose";

const GalleryImg = new Schema({
   title: { type: String },
   imgLink: { type: String, require: true },
   tags: { type: [String] },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
   datetime: {type: Date, require: true},
   likes: {type: Number}
});


export default model('GalleryImg', GalleryImg)
