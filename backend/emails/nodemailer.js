const nodemailer = require('nodemailer')



const transporter = nodemailer.createTransport(
   {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
          user: 'vkowalex@gmail.com',
          pass: process.env.GMAIL_PASSWORD
      }
   },
   {
      from : 'Mailer test <vkowalex@gmail.com>',
   }
)

const mailer = (message) => {
   transporter.sendMail(message, (err, info) => {
      if (err) return console.log(err)
      else console.log(info)
   })
}

module.exports = mailer