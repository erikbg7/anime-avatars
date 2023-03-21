import { z } from 'zod';
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

      return { data };
    }),
    setDispatched: procedure.input(isCustomerSchema).mutation(async ({ ctx, input }) => {
      const { session_id } = input;

      await ctx.supabase
        .from('customers')
        .update({ dispatched: true })
        .eq('id', session_id)
        .single();

      return { data: 'SUCCESS' };
    }),
    create: procedure.input(createCustomerSchema).mutation(async ({ ctx, input }) => {
      const { id, email } = input;
      const { data, error } = await ctx.supabase.from('customers').insert({ id, email }).single();

      if (error) {
        throw new TRPCClientError(error.message);
      }

      return { data };
    }),
    addDiffusion: procedure
      .input(z.object({ customer_id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { customer_id } = input;

        const { data, error } = await ctx.supabase.from('diffusions').insert([
          { job_id: 'job1', customer_id, style: 'kawaii' },
          { job_id: 'job2', customer_id, style: 'shonen' },
        ]);

        console.log({ data, error });

        return data;
      }),
    getDiffusions: procedure
      .input(z.object({ customer_id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { data: diffusions, error } = await ctx.supabase
          .from('diffusions')
          .select('*')
          .filter('customer_id', 'eq', input.customer_id);

        if (error) throw new TRPCClientError(error.message);

        return diffusions;
      }),
  });
};
