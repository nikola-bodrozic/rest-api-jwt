const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, default: null }
});

module.exports = mongoose.model("book", bookSchema);