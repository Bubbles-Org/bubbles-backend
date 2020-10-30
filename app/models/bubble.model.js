const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const BubbleSchema = new Schema({
  name: String,
  users: [
    {
      userId: { type: Schema.Types.ObjectId, ref: "User" },
      role: String,
    },
  ],
  recomendations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Recomendation",
    },
  ],
});

const model = mongoose.model("Bubble", BubbleSchema);

module.exports = model;
