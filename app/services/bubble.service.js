const Bubble = require("../models/bubble.model");

async function create({ userId, bubble }) {
  return new Bubble({
    ...bubble,
    users: [{ userId, role: "owner" }],
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

async function getAll() {
  const bubbles = await Bubble.find({});

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
