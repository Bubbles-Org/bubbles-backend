const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const TagSchema = new Schema({
  label: String,
});

const model = mongoose.model("Tag", TagSchema);

module.exports = model;
