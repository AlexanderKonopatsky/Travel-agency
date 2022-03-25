const jwt = require('jsonwebtoken')


module.exports = {
  
  isAuth: function(req, res, next) {
    const authorization = req.headers.authorization
    if (authorization) {
      const token = authorization.slice(7, authorization.length)
      jwt.verify(token, process.env.JWT_TOKEN || '73UCuYCi', (err, decode) => {
        if (err) {
          res.status(401).send({message: 'Invalid JWT token'})
        } else {

          req.user = decode
          console.log(req.user)
          next()
        }
      })
    } else {
      res.status(401).send({ message: 'No JWT token'})
    }
  },

  isAdmin: function(req, res, next) {
    const authorization = req.headers.authorization
    if (authorization) {
      const token = authorization.slice(7, authorization.length)
      jwt.verify(token, process.env.JWT_TOKEN || '73UCuYCi', (err, decode) => {
        if (err) {
          res.status(401).send({message: 'Invalid JWT token'})
        } else {
          if (decode.isAdmin) {
            next()
          } else {
            res.status(400).send({message: 'Invalid admin token'})
          }
        }
      })
    } else {
      res.status(401).send({ message: 'No JWT token'})
    }
  },

  generateJsonToken: function(user) {
   return jwt.sign({
       _id: user._id,
       firstName: user.firstName,
       lastName: user.lastName,
       email: user.email,
       isAdmin: user.isAdmin
     },
     process.env.JWT_TOKEN || '73UCuYCi',
     {
       expiresIn: '30d'
     }
   )
 },

}

