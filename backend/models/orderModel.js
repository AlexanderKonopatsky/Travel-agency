const { Schema, model, mongoose } = require('mongoose')


const orderSchema = new Schema({
  orderItems: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Tours',
        required: true,
    },
  ],
  paymentMethod: { type: String, required: false },
  totalPrice: { type: Number, required: false },
  userInfo: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  isPaid: { type: Boolean, default: false },
  paidAt: { type: Date },
  },
  {
    timestamps: true,
  }
)

module.exports = model('Orders', orderSchema)