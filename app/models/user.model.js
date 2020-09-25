const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { getDateTime } = require('../services/util.service');

module.exports = mongoose => {
    const User = mongoose.model(
      "user",
      mongoose.Schema(
        {
          name: String,
          email: String,
          password: String
        },
        { timestamps: true }
      )
    );
  
    User.prototype.checkPassword = function (password) {
      return bcrypt.compare(password, this.passwordHash);
    }

    User.prototype.generateAuthToken = function () {
      const { secret, expiration_days } = config.JWT;
      return jwt.sign({ id: this.id }, secret, { expiresIn: `${expiration_days}d` });
    }

    return User;
  };