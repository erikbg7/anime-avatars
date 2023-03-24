import { procedure, router } from '@/server/trpc';
import { TRPCClientError } from '@trpc/client';
import { createCustomerSchema, isCustomerSchema } from './types';

export const createCustomerService = () => {
  return router({
    isDispatched: procedure.input(isCustomerSchema).mutation(async ({ ctx, input }) => {
      const { session_id } = input;

      const { data, error } = await ctx.supabase
        .from('customers')
        .select('id')
        .eq('id', session_id)
        .single();

      if (error) {
        throw new Error(error.message);
      }

      console.log({ data });

      return { data };
    }),
    setDispatched: procedure.input(isCustomerSchema).mutation(async ({ ctx, input }) => {
      const { session_id } = input;

      await ctx.supabase
        .from('customers')
        .update({ dispatched: true })
        .eq('id', session_id)
        .single();
    }),
    create: procedure.input(createCustomerSchema).mutation(async ({ ctx, input }) => {
      const { id, email } = input;
      const { data, error } = await ctx.supabase.from('customers').insert({ id, email }).single();

      if (error) {
        throw new TRPCClientError(error.message);
      }

      return { data };
    }),
  });
};
