import { z } from 'zod';

const customerIdSchema = z.object({ customer_id: z.string() });
const createCustomerSchema = z.object({ id: z.string(), email: z.string() });
const isCustomerSchema = z.object({ session_id: z.string() });

export { createCustomerSchema, isCustomerSchema, customerIdSchema };
