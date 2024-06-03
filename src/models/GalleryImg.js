import { Schema, model } from "mongoose";

const GalleryImg = new Schema({
   title: { type: String, default: "" },
   imgLink: { type: String, require: true },
   tags: { type: [String], default: [] },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
   datetime: {type: Date, require: true, default: new Date()},
   likes: {type: Number, default: 0}
}, {versionKey: false});


export default model('GalleryImg', GalleryImg)
