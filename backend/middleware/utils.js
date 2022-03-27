const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.REACT_APP_OAUTH_CLIENT_ID)
const Axios = require('axios')

module.exports = {
  
  isAuth: async function(req, res, next) {
    const authorization = req.headers.authorization
    const oauth = req.headers.oauth
    const userId = req.headers.userid
    if (oauth === 'gmail') {
      const data = await Axios.post('https://www.googleapis.com/oauth2/v1/tokeninfo', { access_token : authorization.slice(7, authorization.length) })
      if (data.status === 200) {
         let userIdValue = { _id : userId }
         req.user = userIdValue
         next()
      }

    }
    else if (authorization) {
      const token = authorization.slice(7, authorization.length)
      jwt.verify(token, process.env.JWT_TOKEN || '73UCuYCi', async (err, decode) => {
        if (err) {
          res.status(401).send({message: 'Invalid JWT token'})
        } else {
          req.user = decode
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

