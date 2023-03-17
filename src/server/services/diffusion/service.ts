import { router, procedure } from '@/server/trpc';
import { config } from './config';
import {
  interrogateInputSchema,
  interrogateOutputSchema,
  runDiffusionInputSchema,
  runDiffusionOutputSchema,
  statusDiffusionInputSchema,
} from './types';

export const createDiffusionService = () => {
  return router({
    interrogate: procedure
      .input(interrogateInputSchema)
      .output(interrogateOutputSchema)
      .mutation(async ({ input }) => {
        const { base64Image, quality } = input;
        console.log('interrogating', { input });
        const res = await fetch(config.INTERROGATE.ENDPOINT, {
          mode: 'no-cors',
          body: JSON.stringify({
            data: [base64Image, quality],
          }),
          ...config.INTERROGATE.CONFIG,
        });

        const data = await res.json();
        console.log({ data });
        return { description: data?.data || 'no description' };
      }),
    create: procedure
      .input(runDiffusionInputSchema)
      .output(runDiffusionOutputSchema)
      .mutation(async ({ input }) => {
        console.log('Creating');
        return { data: 'hey' };
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
