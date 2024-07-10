import { z } from 'zod';

const createProductValidationSchema = z.object({
  body: z.object({
    name: z.string(),
    category: z.string(),
    instock: z.number().min(0),
    brand: z.string(),
    rating: z.number().min(0).max(5),
    description: z.string(),
    price: z.number().positive(),
    image: z.string().url(),
  }),
});

const updateProductValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    category: z.string().optional(),
    instock: z.number().min(0).optional(),
    brand: z.string().optional(),
    rating: z.number().min(0).max(5).optional(),
    description: z.string().optional(),
    price: z.number().positive().optional(),
    image: z.string().url().optional(),
  }),
});

export const ProductValidation = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
