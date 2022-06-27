const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport(
   {
      host: 'smtp.gmail.com',
      pool: true,
      port: 465,
      secure: true,
      auth: {
          user: 'vkowalex@gmail.com',
          pass: process.env.GMAIL_PASSWORD
      }
   },
   {
      from : 'Почта <vkowalex@gmail.com>',
   }
)

transporter.verify((error, success) => {
   error ? console.log(error) : console.log('Server is ready to take our messages:', success) 
})

const mailer = (message) => {
   transporter.sendMail(message, (err, info) => {
      if (err) return console.log(err)
      else console.log('mail was sended')
   })
}

module.exports = mailer