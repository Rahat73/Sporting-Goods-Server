import { z } from 'zod';

const createOrderValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    email: z.string().email(),
    phone: z.string(),
    address: z.string(),
    productId: z.string(),
    quantity: z.number().min(1),
  }),
});

export const OrderValidations = {
  createOrderValidationSchema,
};
