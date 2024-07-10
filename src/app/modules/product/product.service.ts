import AppError from '../../errors/AppError';
import { TProduct } from './product.interface';
import { Product } from './product.model';

const createProductIntoDB = async (payload: TProduct) => {
  const result = await Product.create(payload);
  return result;
};

const getAllProductFromDB = async () => {
  const result = await Product.find();

  return result;
};

const updateProductIntoDB = async (id: string, payload: Partial<TProduct>) => {
  //check if Product exists
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, 'No Product found');

  const result = await Product.findByIdAndUpdate(id, payload, {
    new: true,
  });
  return result;
};

const deleteProductFromDB = async (id: string) => {
  //check if Product exists
  const product = await Product.findById(id);
  if (!product) throw new AppError(404, 'No Product found');

  const result = await Product.findByIdAndDelete(id);
  return result;
};

export const ProductServices = {
  createProductIntoDB,
  getAllProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB,
};
