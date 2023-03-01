import { router, procedure } from '@/server/trpc';
import {
  createCustomerSchema,
  DiffusionResult,
  diffusionResultSchema,
  isCustomerSchema,
  promptInputSchema,
} from './types';
import { config } from './config';
import { z } from 'zod';

export const createDiffusionService = () => {
  return router({
    getUploadToken: procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { data, error } = await ctx.supabase
          .from('customers')
          .select('dispatched')
          .eq('id', input.id)
          .single();

        console.log({ data });

        if (error) {
          throw new Error(error.message);
        }

        return process.env.SUPABASE_SECRET_KEY as string;
      }),
    upload: procedure.input(z.object({ id: z.string() })).mutation(async ({ ctx, input }) => {
      return { data: { id: input.id } };
    }),
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
    create: procedure
      .input(promptInputSchema)
      .output(diffusionResultSchema)
      .mutation(async ({ ctx, input }) => {
        const inputData = { input };

        const res = await fetch(config.CREATE.ENDPOINT, {
          body: JSON.stringify(inputData),
          ...config.CREATE.CONFIG,
        });

        const data = (await res.json()) as DiffusionResult;
        return data;
      }),
    retrieve: procedure.query(async ({ ctx }) => {
      const jobId = 'c72b4a16-7ae0-42f6-97a2-d7fa76cb91bb';
      const endpoint = `${config.RETRIEVE.ENDPOINT}/${jobId}`;

      const res = await fetch(endpoint, config.RETRIEVE.CONFIG);
      const data = await res.json();

      console.log({ data });

      return { data };
    }),
  });
};
