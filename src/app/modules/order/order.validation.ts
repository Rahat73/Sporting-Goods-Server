import { z } from 'zod';

const productSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1),
});

const createOrderValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    products: z.array(productSchema),
    description: z.string().optional(),
  }),
});
export const OrderValidations = {
  createOrderValidationSchema,
};
