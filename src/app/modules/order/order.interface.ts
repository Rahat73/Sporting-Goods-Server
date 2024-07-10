import { Types } from 'mongoose';

export type TOrder = {
  name: string;
  email: string;
  phone: string;
  address: string;
  productId: Types.ObjectId;
  quantity: number;
};
