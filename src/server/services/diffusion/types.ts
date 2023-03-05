import z from 'zod';

const interrogateInputSchema = z.object({ base64Image: z.string(), quality: z.string() });
const interrogateOutputSchema = z.object({ description: z.string() });

type DiffusionStatus = z.infer<typeof diffusionStatusSchema>;
const diffusionStatusSchema = z.enum(['COMPLETED', 'IN_QUEUE', 'IN_PROGRESS', 'FAILED']);

type DiffusionResultImage = z.infer<typeof diffusionResultImageSchema>;
const diffusionResultImageSchema = z.object({ image: z.string().url(), seed: z.number() });

type DiffusionRunInput = z.infer<typeof runDiffusionInputSchema>;
const runDiffusionInputSchema = z.object({
  prompt: z.string(),
  negative_prompt: z.string().optional(),
  prompt_strength: z.number().min(0).max(1).optional(),
  guidance_scale: z.number().min(1).max(20).optional(),
  init_image: z.string().url().optional(),
  scheduler: z.string().optional(),
  num_inference_steps: z.number().min(0).max(500).optional(),
  seed: z.number().optional(),
});

type DiffusionRunOutput = z.infer<typeof runDiffusionOutputSchema>;
const runDiffusionOutputSchema = z.object({ id: z.string(), status: diffusionStatusSchema });

type DiffusionStatusInput = z.infer<typeof statusDiffusionInputSchema>;
const statusDiffusionInputSchema = z.object({ jobId: z.string() });

type DiffusionStatusOutput = z.infer<typeof statusDiffusionOutputSchema>;
const statusDiffusionOutputSchema = z.object({
  id: z.string().optional(),
  delayTime: z.number().optional(),
  executionTime: z.number().optional(),
  status: diffusionStatusSchema,
  input: runDiffusionInputSchema,
  output: z.array(diffusionResultImageSchema).optional(),
});

export {
  interrogateInputSchema,
  interrogateOutputSchema,
  diffusionStatusSchema,
  diffusionResultImageSchema,
  runDiffusionInputSchema,
  runDiffusionOutputSchema,
  statusDiffusionInputSchema,
  statusDiffusionOutputSchema,
};

export type {
  DiffusionResultImage,
  DiffusionRunInput,
  DiffusionRunOutput,
  DiffusionStatus,
  DiffusionStatusInput,
  DiffusionStatusOutput,
};
