var mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  email: { type: String },
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String },
  password: { type: String }
})

module.exports = mongoose.model('User', userSchema);