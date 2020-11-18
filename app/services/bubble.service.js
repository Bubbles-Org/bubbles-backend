var mongoose = require("mongoose");
const user = require("../middlewares/validators/user");

const Bubble = require("../models/bubble.model");
const Recomendation = require("../models/recomendation.model")
const userService = require("./user.service");

async function create({ userId, bubble }) {
  return new Bubble({
    ...bubble,
    users: [{ userId: mongoose.Types.ObjectId(userId), role: "owner" }],
  }).save();
}

async function get(id) {
  return Bubble.findById(id);
}

async function getAll({ userId }) {
  let bubbles = await Bubble.find(
    {
      "users.userId": mongoose.Types.ObjectId(userId),
    },
    { name: 1, users: 1 }
  );

  bubbles.forEach((bubble) => {
    bubble.users = bubble.users.filter(({ role }) => role === "owner");
  });
  bubbles = await Bubble.populate(bubbles, {
    path: "users.userId",
    select: "name -_id",
  });

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
  recomendation = await new Recomendation({
    text: info.text,
    tags: info.tags,
    user: mongoose.Types.ObjectId(info.userId),
  }).save();

  return Bubble.findByIdAndUpdate(
    id,
    {
      $push: {
        recomendations: recomendation
      }
    },
    { useFindAndModify: false, new: true }
  );
}

async function addUser({ userId, emailToAdd, role, bubbleId }) {
  const userObjId = mongoose.Types.ObjectId(userId);
  const [{ _id: userToAdd }] = await userService.getByEmail(emailToAdd);
  const bubbleToUpdate = await get(bubbleId);
  return Bubble.findOneAndUpdate(
    {
      "users.userId": { $ne: userToAdd, $eq: userObjId },
      ...(bubbleToUpdate.private && {
        "users.role": { $in: ["owner", "moderator"] },
      }),
    },
    {
      $push: {
        users: { userId: userToAdd, role },
      },
    },
    { useFindAndModify: false, new: true }
  );
}

module.exports = {
  create,
  get,
  getAll,
  deleteBubble,
  updateBubble,
  addUser,
};
