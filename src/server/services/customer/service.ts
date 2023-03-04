import { procedure, router } from '@/server/trpc';
import { createCustomerSchema, isCustomerSchema } from './types';

export const createCustomerService = () => {
  return router({
    createCustomer: procedure.input(createCustomerSchema).mutation(async ({ ctx, input }) => {
      const { id, email } = input;

      const { data, error } = await ctx.supabase.from('customers').insert([{ id, email }]).single();

      if (error) {
        throw new Error(error.message);
      }

      return { data };
    }),
    isCustomerDispatched: procedure.input(isCustomerSchema).mutation(async ({ ctx, input }) => {
      const { session_id } = input;

      const { data, error } = await ctx.supabase
        .from('customers')
        .select('id')
        .eq('id', session_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      return { data };
    }),
  });
};
