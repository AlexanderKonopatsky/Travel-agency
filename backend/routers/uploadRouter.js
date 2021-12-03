const express = require('express')
const multer = require('multer')
const { isAuth } = require('../utils')

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
  res.send(`${req.file.path}`)
})



module.exports = uploadRouter