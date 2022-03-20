const { Schema, model, mongoose } = require('mongoose')


const countrySchema = new Schema({
  countryName: { type: String, required: true },
  countryDesc: { type: String, required: true },
  countryImage: { type: String, required: true },
  }
)

module.exports = model('Country', countrySchema)