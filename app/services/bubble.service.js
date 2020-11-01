var mongoose = require('mongoose');

const Bubble = require("../models/bubble.model");

async function create({ userId, bubble }) {
  return new Bubble({
    ...bubble,
    users: [{ "userId": mongoose.Types.ObjectId(userId), role: "owner" }],
  }).save();
}

async function get(id) {
  try {
    const bubble = await Bubble.findById(id);

    if (!bubble) {
      return null;
    }

    return bubble;
  } catch (error) {
    return error;
  }
}

async function getAll({ userId }) {

  const bubbles = await Bubble.find({ "users.userId": mongoose.mongo.ObjectId(userId) });

  if (!bubbles) {
    return null;
  }

  return bubbles;
}

async function deleteBubble(id) {
  try {
    const bubble = await Bubble.deleteOne(id);
    if (!bubble) {
      return null;
    }
    return bubble;
  } catch (error) {
    return error;
  }
}

async function updateBubble(id, info) {
  try {
    const bubble = await Bubble.findById(id);
    bubble = bubble.update(info);
    if (!bubble) {
      return null;
    }
    return bubble;
  } catch (error) {
    return error;
  }
}

module.exports = {
  create,
  get,
  getAll,
  deleteBubble,
  updateBubble,
};
