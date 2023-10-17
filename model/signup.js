const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const userSchema = new Schema({
  uname : String,
  password : String
});

const USER = mongoose.model("signup" , userSchema)

module.exports = USER