const bcrypt = require('bcryptjs');
const config = require('../config/enviroment');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { Schema } = require('mongoose');
const { getDateTime } = require('../services/util.service');
const SALT_WORK_FACTOR = 10;

const UserSchema = new Schema({
      name: String,
      email: String,
      password: String
});
    
    
UserSchema.pre('save', async function save(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

UserSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compareSync(data, this.password);
};

UserSchema.methods.generateAuthToken = function () {
  const { secret, expiration_days } = config.JWT;
  return jwt.sign({
    user: {
      id: this.id,
      name: this.name,
      email: this.email
    }
  },
  secret,
  {
    expiresIn: `${expiration_days}d`
  });
}

const model = mongoose.model('User', UserSchema);

module.exports = model;