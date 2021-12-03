const { Schema, model } = require('mongoose')

const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: true, required: true }
  },
  {
    timestamps: true
  }
)

module.exports = model('Users', userSchema)