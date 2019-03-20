const mongoose = require('mongoose')

const Schema = mongoose.Schema

let UserSchema = new Schema({
  nombres: { type: String, required: true },
  apellidos: { type: String, required: true},
  email: { type: String, required: true},
  password: { type: String, required: true}
})

let UserModel = mongoose.model('Usuario', UserSchema)

module.exports = UserModel
