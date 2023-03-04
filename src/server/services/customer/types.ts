import { z } from 'zod';

const createCustomerSchema = z.object({ id: z.string(), email: z.string() });
const isCustomerSchema = z.object({ session_id: z.string() });

export { createCustomerSchema, isCustomerSchema };
