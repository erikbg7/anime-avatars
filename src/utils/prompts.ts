import { DiffusionRunInput } from '@/server/services/diffusion/types';

export const buildImagePrompt = (
  prompt: DiffusionRunInput['diffusion'],
  genre: string,
  url: string
) => {
  return {
    ...prompt,
    init_image: url,
    prompt: prompt.prompt.replace('{genre}', genre),
  };
};

const buildPromptInput = (
  prompt: DiffusionRunInput['diffusion']['prompt'],
  cfg: DiffusionRunInput['diffusion']['guidance_scale'],
  strength: DiffusionRunInput['diffusion']['prompt_strength'],
  steps: DiffusionRunInput['diffusion']['num_inference_steps'],
  options?: {
    seed?: DiffusionRunInput['diffusion']['seed'];
    scheduler?: DiffusionRunInput['diffusion']['scheduler'];
  }
) => {
  return {
    prompt: prompt,
    prompt_strength: strength,
    num_inference_steps: steps || 40,
    guidance_scale: cfg,
    scheduler: options?.scheduler,
    seed: options?.seed,
    negative_prompt:
      'nsfw, nude, naked, (ugly:1.3), (fused fingers), (too many fingers), (bad anatomy:1.5), (watermark:1.5), (words), letters, untracked eyes, asymmetric eyes, floating head, (logo:1.5), (bad hands:1.3), (mangled hands:1.2), (missing hands), (missing arms), backward hands, floating jewelry, unattached jewelry, floating head, doubled head, unattached head, doubled head, head in body, (misshapen body:1.1), (badly fitted headwear:1.2), floating arms, (too many arms:1.5), limbs fused with body, (facial blemish:1.5), badly fitted clothes, imperfect eyes, untracked eyes, crossed eyes, hair growing from clothes, partial faces, hair not attached to head',
  };
};

const PROMPTS = {
  KAWAII:
    'portrait of an adult {genre} with animal ears in a cherry blossom tree background, kawaii anime style, masterpiece, high quality',
  SHONEN:
    'portrait of an adult {genre} with scar on eye, scars around face, angry, lightnings in the background, lightnings, shonen anime style, masterpiece, best quality',
  NARUTO:
    'portrait of an adult {genre} with konoha headband, naruto headband, sharingan eye,, shonen anime style, masterpiece, best quality',
};

export const KAWAII_PROMPTS: DiffusionRunInput['diffusion'][] = [
  buildPromptInput(PROMPTS.KAWAII, 10, 0.85, 30, { scheduler: 'EULER-A' }),
  buildPromptInput(PROMPTS.KAWAII, 10, 0.85, 50, { scheduler: 'EULER-A' }),
  buildPromptInput(PROMPTS.KAWAII, 10, 0.75, 30, { scheduler: 'EULER-A' }),
  buildPromptInput(PROMPTS.KAWAII, 10, 0.75, 50, { scheduler: 'EULER-A' }),
];

export const SHONEN_PROMPTS: DiffusionRunInput['diffusion'][] = [
  buildPromptInput(PROMPTS.SHONEN, 6, 0.7, 70, { seed: 60144 }),
  buildPromptInput(PROMPTS.SHONEN, 10, 0.85, 70, { seed: 60144 }),
  buildPromptInput(PROMPTS.SHONEN, 10, 0.75, 50, { seed: 60144 }),
  buildPromptInput(PROMPTS.SHONEN, 10, 0.85, 40, { seed: 60144 }),
];

export const NARUTO_PROMPTS: DiffusionRunInput['diffusion'][] = [
  buildPromptInput(PROMPTS.NARUTO, 6, 0.7, 70, { seed: 60144 }),
  buildPromptInput(PROMPTS.NARUTO, 10, 0.85, 70, { seed: 60144 }),
  buildPromptInput(PROMPTS.NARUTO, 10, 0.75, 50, { seed: 60144 }),
  buildPromptInput(PROMPTS.NARUTO, 10, 0.85, 40, { seed: 60144 }),
];

export const MECHA: DiffusionRunInput['diffusion'][] = [
  {
    prompt:
      'portrait of an adult {genre} with scar on eye, scars around face, angry, lightnings in the background, lightnings, shonen anime style, masterpiece, best quality',
    prompt_strength: 0.7,
    num_inference_steps: 70,
    guidance_scale: 6,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  },
  {
    prompt:
      'portrait of an adult {genre} with scar on eye, scars around face, angry, lightnings in the background, lightnings, shonen anime style, masterpiece, best quality',
    prompt_strength: 0.85,
    num_inference_steps: 70,
    guidance_scale: 10,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  },
];
