import { procedure, router } from '@/server/trpc';
import { z } from 'zod';

export function createStorageService() {
  return router({
    getUploadToken: procedure
      .input(z.object({ id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        const { error } = await ctx.supabase
          .from('customers')
          .select('dispatched')
          .eq('id', input.id)
          .single();

        if (error) {
          throw new Error(error.message);
        }

        return process.env.SUPABASE_SECRET_KEY as string;
      }),
  });
}

// Policy for images bucket, if(customer_id in customers database and customers[customer_id].isDispatched = false;)
