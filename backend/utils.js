const jwt = require('jsonwebtoken')

const generateJsonToken = (user) => {
  return jwt.sign({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin
    },
    process.env.JWT_TOKEN,
    {
      expiresIn: '30d'
    }
  )
}

module.exports = generateJsonToken