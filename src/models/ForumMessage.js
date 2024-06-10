import { Schema, model } from "mongoose";

const ForumMessage = new Schema({
   title: { type: String, require: true },
   description: { type: String, require: true },
   userId: { type: Schema.Types.ObjectId, require: true, ref: "User" },
   datetime: {type: Date, require: true, default: new Date()},
}, {versionKey: false});


export default model('ForumMessage', ForumMessage)