const express = require('express')
const multer = require('multer')
const { isAuth, isAdmin } = require('../middleware/utils')

const uploadRouter = express.Router()

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.jpg`)
  }
})

const upload = multer({ storage })

uploadRouter.post('/', isAuth, upload.single('image'), async (req, res) => {
   if (req.hasOwnProperty('file')) {
      res.send(`${req.file.path}`)
   } else {
      res.send('Выберите изображение')
   }

})



module.exports = uploadRouter