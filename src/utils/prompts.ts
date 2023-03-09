import { DiffusionRunInput } from '@/server/services/diffusion/types';

const getPromptBuilder =
  (prompt: string) =>
  (
    cfg: DiffusionRunInput['guidance_scale'],
    strength: DiffusionRunInput['prompt_strength'],
    scheduler: DiffusionRunInput['scheduler'],
    steps?: DiffusionRunInput['num_inference_steps']
  ) => {
    return {
      prompt: prompt,
      prompt_strength: strength,
      num_inference_steps: steps || 40,
      guidance_scale: cfg,
      scheduler: scheduler,
      negative_prompt:
        'nsfw, nude, naked, (ugly:1.3), (fused fingers), (too many fingers), (bad anatomy:1.5), (watermark:1.5), (words), letters, untracked eyes, asymmetric eyes, floating head, (logo:1.5), (bad hands:1.3), (mangled hands:1.2), (missing hands), (missing arms), backward hands, floating jewelry, unattached jewelry, floating head, doubled head, unattached head, doubled head, head in body, (misshapen body:1.1), (badly fitted headwear:1.2), floating arms, (too many arms:1.5), limbs fused with body, (facial blemish:1.5), badly fitted clothes, imperfect eyes, untracked eyes, crossed eyes, hair growing from clothes, partial faces, hair not attached to head',
    };
  };

const buildKawaiiPrompt = getPromptBuilder(
  'portrait of an adult {genre} with animal ears in a cherry blossom tree background, kawaii anime style, masterpiece, high quality'
);

export const KAWAII_PROMPTS: DiffusionRunInput[] = [
  buildKawaiiPrompt(10, 0.85, 'EULER-A', 30),
  buildKawaiiPrompt(10, 0.85, 'EULER-A', 50),
  buildKawaiiPrompt(10, 0.75, 'EULER-A', 30),
  buildKawaiiPrompt(10, 0.75, 'EULER-A', 50),
];

// export const KAWAII_PROMPTS: DiffusionRunInput[] = [
//   {
//     prompt:
//       'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, kawaii anime style, masterpiece, best quality',
//     prompt_strength: 0.7,
//     num_inference_steps: 70,
//     guidance_scale: 6,
//     seed: 60144,
//     negative_prompt:
//       '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
//   },
//   {
//     prompt:
//       'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
//     prompt_strength: 0.85,
//     num_inference_steps: 70,
//     guidance_scale: 10,
//     seed: 60144,
//   },
// ];

export const NARUTO_PROMPTS: DiffusionRunInput[] = [
  {
    prompt:
      'portrait of an adult {genre} with konoha headband, naruto headband, sharingan eye,, shonen anime style, masterpiece, best quality',
    prompt_strength: 0.7,
    num_inference_steps: 70,
    guidance_scale: 6,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  },
  {
    prompt:
      'portrait of an adult {genre} with konoha headband, naruto headband, sharingan eye,, shonen anime style, masterpiece, best quality',
    prompt_strength: 0.85,
    num_inference_steps: 70,
    guidance_scale: 10,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  },
];

export const SHONEN_PROMPTS: DiffusionRunInput[] = [
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

export const MECHA: DiffusionRunInput[] = [
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
