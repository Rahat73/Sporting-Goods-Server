import { model, Schema } from 'mongoose';
import { TOrder } from './order.interface';

const orderProductSchema = new Schema({
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, min: 1, required: true },
});

const orderSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  products: { type: [orderProductSchema], required: true },
  description: { type: String },
});

export const Order = model<TOrder>('Order', orderSchema);
