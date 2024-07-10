import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { OrderServices } from './order.service';

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrderIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Order added successfully',
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getAllOrdersFromDB();
  if (result.length === 0) {
    sendResponse(res, {
      statusCode: 404,
      success: false,
      message: 'No data found',
      data: result,
    });
  } else {
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: 'Orders retrieved successfully',
      data: result,
    });
  }
});

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
