import mongoose from 'mongoose';
import { TOrder } from './order.interface';
import { Order } from './order.model';
import { Product } from '../product/product.model';
import AppError from '../../errors/AppError';

const createOrderIntoDB = async (payload: TOrder) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // Check availability and reduce instock quantities
    for (const product of payload.products) {
      const productRecord = await Product.findById(product.productId).session(
        session,
      );

      if (!productRecord) {
        throw new AppError(404, `Product not found.`);
      }

      if (productRecord.instock < product.quantity) {
        throw new AppError(
          404,
          `Insufficient stock for product ${productRecord.name}.`,
        );
      }

      productRecord.instock -= product.quantity;
      await productRecord.save({ session });
    }

    // Create the order
    const result = await Order.create([payload], { session });

    // Commit the transaction
    await session.commitTransaction();
    session.endSession();

    return result;
  } catch (error) {
    // If an error occurred, abort the transaction
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};
const getAllOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

export const OrderServices = {
  createOrderIntoDB,
  getAllOrdersFromDB,
};
