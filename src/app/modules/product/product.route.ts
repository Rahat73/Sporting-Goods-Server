import { Router } from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './product.validation';
import { ProductControllers } from './product.controller';

const router = Router();

router.post(
  '/',
  validateRequest(ProductValidations.createProductValidationSchema),
  ProductControllers.createProduct,
);

router.get('/:id', ProductControllers.getProductById);

router.get('/', ProductControllers.getAllProducts);

router.put(
  '/:id',
  validateRequest(ProductValidations.updateProductValidationSchema),
  ProductControllers.updateProduct,
);

router.delete('/:id', ProductControllers.deleteProduct);

export const ProductRoutes = router;
