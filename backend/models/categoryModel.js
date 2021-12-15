const { Schema, model, mongoose } = require('mongoose')


const categorySchema = new Schema({
  categoryName: { type: String, required: true },
  categoryDesc: { type: String, required: true },
  categoryImage: { type: String, required: false },
  }
)

module.exports = model('Сategories', categorySchema)