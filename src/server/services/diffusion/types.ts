import z from 'zod';

type PromptInput = z.infer<typeof promptInputSchema>;
const promptInputSchema = z.object({
  prompt: z.string(),
  prompt_strength: z.number().min(0).max(1).optional(),
  guidance_scale: z.number().min(1).max(20).optional(),
  init_image: z.string().url().optional(),
});

type DiffusionStatus = z.infer<typeof diffusionStatusSchema>;
const diffusionStatusSchema = z.enum(['COMPLETED', 'IN_QUEUE', 'IN_PROGRESS', 'FAILED']);

type DiffusionResultImage = z.infer<typeof diffusionResultImageSchema>;
const diffusionResultImageSchema = z.object({ image: z.string().url(), seed: z.number() });

type DiffusionResult = z.infer<typeof diffusionResultSchema>;
const diffusionResultSchema = z.object({
  id: z.string(),
  delayTime: z.number(),
  executionTime: z.number(),
  status: diffusionStatusSchema,
  input: promptInputSchema,
  output: z.array(diffusionResultImageSchema),
});

const createCustomerSchema = z.object({ id: z.string(), email: z.string() });

const isCustomerSchema = z.object({ session_id: z.string() });

export {
  createCustomerSchema,
  promptInputSchema,
  diffusionResultSchema,
  diffusionResultImageSchema,
  diffusionStatusSchema,
  isCustomerSchema,
};

export type { PromptInput, DiffusionResult, DiffusionResultImage, DiffusionStatus };
