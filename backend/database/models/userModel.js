const mongoose = require("mongoose")

const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 4
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  }
  });

const User = mongoose.model('Users', userSchema);

module.exports = User;