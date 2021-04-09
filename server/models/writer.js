const mongoose = require("mongoose");
const writerSchema = new mongoose.Schema({
  name: String,
});

module.exports = mongoose.model("Writer", writerSchema);
