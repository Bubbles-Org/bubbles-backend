const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const schema = new Schema({
  text: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  tags: [
    {
      type: [String]
    },
  ],
});

const model = mongoose.model("Recomendation", schema);

module.exports = model;
