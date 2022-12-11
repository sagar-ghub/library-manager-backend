const mongoose = require("mongoose");

// Define a schema
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: String,
  author: String,
  subject: String,
  publishedDate: { type: Date, default: Date.now },
  image: { type: Schema.Types.ObjectId, ref: "Image" },
});

BookSchema.index({ title: "text", author: 1, subject: 1, publishedDate: 1 });

const BookModel = mongoose.model("Book", BookSchema);

module.exports = BookModel;
