import { router, procedure } from '@/server/trpc';
import { config } from './config';
import {
  runDiffusionInputSchema,
  runDiffusionOutputSchema,
  statusDiffusionInputSchema,
} from './types';

export const createDiffusionService = () => {
  return router({
    create: procedure
      .input(runDiffusionInputSchema)
      .output(runDiffusionOutputSchema)
      .mutation(async ({ input }) => {
        const res = await fetch(config.CREATE.ENDPOINT, {
          body: JSON.stringify({ input }),
          ...config.CREATE.CONFIG,
        });

        const data = await res.json();
        return data;
      }),
    retrieve: procedure.input(statusDiffusionInputSchema).mutation(async ({ input }) => {
      const endpoint = `${config.RETRIEVE.ENDPOINT}/${input.jobId}`;
      const res = await fetch(endpoint, config.RETRIEVE.CONFIG);
      const data = await res.json();
      console.log({ data });
      return data;
    }),
  });
};
