import { router, procedure } from '@/server/trpc';
import { promptInputSchema } from './types';
import { config } from './config';

export const createDiffusionService = () => {
  return router({
    create: procedure.input(promptInputSchema).mutation(async ({ ctx, input }) => {
      const inputData = { input };

      const res = await fetch(config.CREATE.ENDPOINT, {
        body: JSON.stringify(inputData),
        ...config.CREATE.CONFIG,
      });

      const data = await res.json();
      return { data };
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
