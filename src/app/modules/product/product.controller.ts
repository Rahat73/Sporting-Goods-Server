import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { ProductServices } from './product.service';

const createProduct = catchAsync(async (req, res) => {
  const result = await ProductServices.createProductIntoDB(req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product added successfully',
    data: result,
  });
});

const getAllProducts = catchAsync(async (req, res) => {
  const result = await ProductServices.getAllProductFromDB();

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
      message: 'Products retrieved successfully',
      data: result,
    });
  }
});

const updateProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.updateProductIntoDB(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product updated successfully',
    data: result,
  });
});

const deleteProduct = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await ProductServices.deleteProductFromDB(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Product deleted successfully',
    data: result,
  });
});

export const ProductControllers = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};
