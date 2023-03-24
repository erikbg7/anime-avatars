import z from 'zod';

const interrogateInputSchema = z.object({ base64Image: z.string(), quality: z.string() });
const interrogateOutputSchema = z.object({ description: z.string() });

type DiffusionStatus = z.infer<typeof diffusionStatusSchema>;
const diffusionStatusSchema = z.enum(['COMPLETED', 'IN_QUEUE', 'IN_PROGRESS', 'FAILED']);

type DiffusionResultImage = z.infer<typeof diffusionResultImageSchema>;
const diffusionResultImageSchema = z.object({ image: z.string().url(), seed: z.number() });

type DiffusionRunInput = z.infer<typeof runDiffusionInputSchema>;
const runDiffusionInputSchema = z.object({
  customerId: z.string(),
  style: z.string(),
  diffusion: z.object({
    prompt: z.string(),
    negative_prompt: z.string().optional(),
    prompt_strength: z.number().min(0).max(1).optional(),
    guidance_scale: z.number().min(1).max(20).optional(),
    init_image: z.string().url().optional(),
    scheduler: z.string().optional(),
    num_inference_steps: z.number().min(0).max(500).optional(),
    seed: z.number().optional(),
  }),
});

type DiffusionRunOutput = z.infer<typeof runDiffusionOutputSchema>;
const runDiffusionOutputSchema = z.object({ id: z.string(), status: diffusionStatusSchema });

type DiffusionStatusInput = z.infer<typeof statusDiffusionInputSchema>;
const statusDiffusionInputSchema = z.object({ jobId: z.string() });

type DiffusionStatusOutput = z.infer<typeof statusDiffusionOutputSchema>;
const statusDiffusionOutputSchema = z.object({
  status: diffusionStatusSchema,
  image: z.string().optional(),
});

const createJobsSchemaInput = z.object({
  genre: z.string(),
  baseUrl: z.string(),
  customer_id: z.string(),
});
const createJobsSchemaOutput = z.object({
  genre: z.string(),
  baseUrl: z.string(),
  customer_id: z.string(),
});

type DiffusionStyle = z.infer<typeof diffusionStyleSchema>;
const diffusionStyleSchema = z.enum(['kawaii', 'shonen', 'naruto']);

const diffusionSchema = z.object({
  job_id: z.string(),
  customer_id: z.string(),
  style: diffusionStyleSchema,
  url: z.string().url().optional(),
  status: diffusionStatusSchema,
});

const diffusionRetrieveOutput = z.array(diffusionSchema.pick({ job_id: true, style: true }));

export {
  createJobsSchemaInput,
  interrogateInputSchema,
  interrogateOutputSchema,
  diffusionStatusSchema,
  diffusionResultImageSchema,
  diffusionRetrieveOutput,
  runDiffusionInputSchema,
  runDiffusionOutputSchema,
  statusDiffusionInputSchema,
  statusDiffusionOutputSchema,
};

export type {
  DiffusionStyle,
  DiffusionResultImage,
  DiffusionRunInput,
  DiffusionRunOutput,
  DiffusionStatus,
  DiffusionStatusInput,
  DiffusionStatusOutput,
};
