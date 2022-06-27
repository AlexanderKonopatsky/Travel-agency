const { Schema, model, mongoose } = require('mongoose')


const citySchema = new Schema({
  cityName: { type: String, required: true },
  cityDesc: { type: String, required: true },
  cityImage: { type: String, required: false },
  country: { type: Schema.Types.ObjectId, ref: 'Country', required: true },
  lon: { type: Number, required: false }, //долгота
  lat: { type: Number, required: false }, //ширина
  }
)

module.exports = model('City', citySchema)