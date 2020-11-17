var mongoose = require("mongoose");
const user = require("../middlewares/validators/user");

const Bubble = require("../models/bubble.model");
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
  const bubbles = await Bubble.find({
    "users.userId": mongoose.Types.ObjectId(userId),
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

async function addUser({ userId, emailToAdd, role, bubbleId }) {
  const userObjId = mongoose.Types.ObjectId(userId);
  const [{ _id: userToAdd }] = await userService.getByEmail(emailToAdd);
  const bubbleToUpdate = await get(bubbleId);
  if (bubbleToUpdate.private) {
    console.log(bubbleToUpdate)
    console.log(userToAdd)
    return Bubble.findOneAndUpdate(
      {
        "users.userId": userObjId,
        "users.role": { $in: ["owner", "moderator"] },
      },
      {
        $push: {
          users: { userId: userToAdd, role },
        },
      },
      { useFindAndModify: false, new: true },
    )
  } else {
    bubbleToUpdate.users.push({
      userId: userToAdd,
      role,
    });
    return bubbleToUpdate.save();
  }
}

module.exports = {
  create,
  get,
  getAll,
  deleteBubble,
  updateBubble,
  addUser,
};
