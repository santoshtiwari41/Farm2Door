
import mongoose from 'mongoose';

const deliverySchema = new mongoose.Schema({
  transaction: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Payment',
    required: true,
  },
  deliveryAddress: {
    type: String,
    required: true,
  },
  deliveryStatus: {
    type: String,
    enum: ['Pending', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
}, { timestamps: true });

const Delivery = mongoose.model('Delivery', deliverySchema);

export default Delivery ;
