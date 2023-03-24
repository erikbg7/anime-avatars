import { router, procedure } from '@/server/trpc';
import { TRPCClientError } from '@trpc/client';
import { config } from './config';
import {
  createJobsSchemaInput,
  diffusionRetrieveOutput,
  DiffusionRunInput,
  DiffusionStyle,
  statusDiffusionInputSchema,
  statusDiffusionOutputSchema,
} from './types';
import { buildImagePrompt, KAWAII_PROMPTS, NARUTO_PROMPTS, SHONEN_PROMPTS } from '@/utils/prompts';
import { customerIdSchema } from '../customer/types';

export const createDiffusionService = () => {
  return router({
    createJobs: procedure.input(createJobsSchemaInput).mutation(async ({ ctx, input }) => {
      const { genre, baseUrl, customer_id } = input;

      const kawaiiPrompts = KAWAII_PROMPTS.map((p) => buildImagePrompt(p, genre, baseUrl));
      const shonenPrompts = SHONEN_PROMPTS.map((p) => buildImagePrompt(p, genre, baseUrl));
      const narutoPrompts = NARUTO_PROMPTS.map((p) => buildImagePrompt(p, genre, baseUrl));

      // const allPrompts = [kawaiiPrompts[0], shonenPrompts[0], narutoPrompts[0]];
      const jobs = await Promise.all([
        ...kawaiiPrompts.slice(0, 1).map((p) => createJob(p, 'kawaii')),
        ...shonenPrompts.slice(0, 1).map((p) => createJob(p, 'shonen')),
        ...narutoPrompts.slice(0, 1).map((p) => createJob(p, 'naruto')),
      ]);

      console.log({ jobs });

      const { data, error } = await ctx.supabase
        .from('diffusions')
        .insert(jobs.map((j) => ({ ...j, customer_id })));

      console.log({ data });

      return data;
    }),
    retrieve: procedure
      .input(statusDiffusionInputSchema)
      .output(statusDiffusionOutputSchema)
      .query(async ({ ctx, input }) => {
        const endpoint = `${config.RETRIEVE.ENDPOINT}/${input.jobId}`;
        const res = await fetch(endpoint, config.RETRIEVE.CONFIG);
        const data = await res.json();

        const image = data?.output?.[0]?.image;
        if (data.status === 'COMPLETED') {
          await ctx.supabase
            .from('diffusions')
            .update({ status: 'completed', url: image })
            .eq('job_id', input.jobId);
        }

        if (data.status === 'FAILED' || data.error) {
          await ctx.supabase
            .from('diffusions')
            .update({ status: 'failed' })
            .eq('job_id', input.jobId);
        }

        // throw new TRPCClientError('Could not generate the image.');
        console.log({ data });
        return {
          image,
          status: data.status || 'IN_PROGRESS',
        };
      }),
    retrieveAll: procedure
      .input(customerIdSchema)
      .output(diffusionRetrieveOutput)
      .query(async ({ ctx, input }) => {
        const { data: diffusions, error } = await ctx.supabase
          .from('diffusions')
          .select('job_id, style')
          .filter('customer_id', 'eq', input.customer_id);

        if (error) throw new TRPCClientError(error.message);

        return diffusions;
      }),
  });
};

const createJob = async (prompt: DiffusionRunInput['diffusion'], style: DiffusionStyle) => {
  const body = JSON.stringify({ input: prompt });
  const res = await fetch(config.CREATE.ENDPOINT, { body, ...config.CREATE.CONFIG });
  const data = await res.json();

  return { job_id: data?.id, style };
};
