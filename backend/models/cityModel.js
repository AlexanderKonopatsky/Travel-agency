const { Schema, model, mongoose } = require('mongoose')


const citySchema = new Schema({
  cityName: { type: String, required: true },
  cityDesc: { type: String, required: true },
  cityImage: { type: String, required: true },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  }
)

module.exports = model('City', citySchema)