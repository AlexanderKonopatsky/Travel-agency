const { Schema, model } = require('mongoose')



const userSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true },
    isActive: { type: Boolean, default: true, required: true },
    imageProfile: { type: String, required: false, default: "\\uploads\\1639313689176.jpg" },
    verificationInfo: {
      uniqueString: { type: String, required: false },
      createdAt: { type: Date, required: false},
      expiresAt: { type: Date, required: false},
    },
    passwordResetInfo: {
      uniqueString: { type: String, required: false },
      createdAt: { type: Date, required: false},
      expiresAt: { type: Date, required: false},
    },
    verified: { type: Boolean, default: false, required: false }
  },
  {
    timestamps: true
  }
)

module.exports = model('Users', userSchema)