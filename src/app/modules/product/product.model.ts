import { model, Schema } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  instock: { type: Number, min: 0, required: true },
  brand: { type: String, required: true },
  rating: { type: Number, min: 0, max: 5, required: true },
  description: { type: String, required: true },
  price: { type: Number, min: 0, required: true },
  image: { type: String, required: true },
});

export const Product = model<TProduct>('Product', productSchema);
