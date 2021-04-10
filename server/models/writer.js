const mongoose = require("mongoose");

const writerSchema = new mongoose.Schema({
  name: String,
  age: Number,
});

module.exports = mongoose.model("Writer", writerSchema);
