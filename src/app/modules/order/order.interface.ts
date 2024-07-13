import { Types } from 'mongoose';

export type TOrderProduct = {
  productId: Types.ObjectId;
  quantity: number;
};

export type TOrder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  products: TOrderProduct[];
  description?: string;
};
