const { Schema, model, mongoose } = require('mongoose')


const ordersInfo = new Schema(
   {
     _id: { type: Schema.Types.ObjectId, ref: 'Tours', required: true },
     startDate: { type: Date, required: true },
     endDate: { type: Date, required: true },
     numberOfPerson: { type: Number, required: true },
     numberOfDays: { type: Number, required: true },
     totalPrice: { type: Number, required: true },
     idSeats: { type: String}
   },
   {
     timestamps: true,
   }
 )

const orderSchema = new Schema({
  orderItems: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Tours',
        required: true,
    },
  ],
  ordersInfo: [ordersInfo],
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