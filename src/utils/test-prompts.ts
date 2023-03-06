import { DiffusionRunInput } from '@/server/services/diffusion/types';

const REALISTIC_PROMPTS: DiffusionRunInput[] = [
  {
    prompt:
      'portrait of an adult {genre} with scratch on face, lightnings on background, shonen anime style, masterpiece, best quality',
    prompt_strength: 0.61,
    num_inference_steps: 70,
    guidance_scale: 12,
  },
  {
    prompt:
      'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, kawaii anime style, masterpiece, best quality',
    prompt_strength: 0.7,
    num_inference_steps: 70,
    guidance_scale: 6,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
    // scheduler: 'DDIM',
  },
];

const NARUTO_PROMPTS_2: DiffusionRunInput[] = [
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

const PROMPTS: DiffusionRunInput[] = [
  {
    prompt:
      'portrait of an adult {genre} with (scratch on face), ((scar on eye)), ((lightnings on background)), shonen anime style, masterpiece, best quality',
    prompt_strength: 0.8,
    num_inference_steps: 70,
    guidance_scale: 12,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
    // scheduler: 'DDIM',
  },

  // More fantasy kawaii
  // {
  //   prompt:
  //     'portrait of an adult {genre} animal ears, (skin color), animal_ears, cat_ears, pointy_ears, kawaii anime style, masterpiece, best quality',
  //   prompt_strength: 0.9,
  //   num_inference_steps: 70,
  //   guidance_scale: 10,
  //   negative_prompt:
  //     'hands, hand, ((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  //   // scheduler: 'DDIM',
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, (skin color), cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.95,
  //   num_inference_steps: 50,
  //   guidance_scale: 10,
  //   scheduler: 'DDIM',
  // },
  {
    prompt:
      'portrait of an adult {genre} with (cat ears), cute, (cherry blossom leaves on background), masterpiece, best quality',
    prompt_strength: 0.8,
    num_inference_steps: 70,
    guidance_scale: 12,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  },
];

const KAWAII_PROMPTS_2: DiffusionRunInput[] = [
  {
    prompt:
      'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
    prompt_strength: 0.95,
    num_inference_steps: 50,
    guidance_scale: 10,
    seed: 60144,
    scheduler: 'DDIM',
  },
  {
    prompt:
      'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
    prompt_strength: 0.85,
    num_inference_steps: 50,
    guidance_scale: 10,
    seed: 60144,
    scheduler: 'DDIM',
  },
  {
    prompt:
      'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
    prompt_strength: 0.75,
    num_inference_steps: 50,
    guidance_scale: 10,
    seed: 60144,
    scheduler: 'DDIM',
  },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.95,
  //   num_inference_steps: 70,
  //   guidance_scale: 8,
  //   seed: 60144,
  //   scheduler: 'DDIM',
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.85,
  //   num_inference_steps: 70,
  //   guidance_scale: 8,
  //   seed: 60144,
  //   scheduler: 'DDIM',
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.75,
  //   num_inference_steps: 70,
  //   guidance_scale: 8,
  //   seed: 60144,
  //   scheduler: 'DDIM',
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.95,
  //   num_inference_steps: 50,
  //   guidance_scale: 10,
  //   seed: 60144,
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.8,
  //   num_inference_steps: 70,
  //   guidance_scale: 12,
  //   seed: 60144,
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, kawaii anime style, masterpiece, best quality',
  //   prompt_strength: 0.7,
  //   num_inference_steps: 70,
  //   guidance_scale: 6,
  //   seed: 60144,
  //   negative_prompt:
  //     '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.85,
  //   num_inference_steps: 70,
  //   guidance_scale: 10,
  //   seed: 60144,
  // },
  // {
  //   prompt:
  //     'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
  //   prompt_strength: 0.85,
  //   num_inference_steps: 70,
  //   guidance_scale: 9,
  //   seed: 60144,
  // },
  {
    prompt:
      'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, kawaii anime style, masterpiece, best quality',
    prompt_strength: 0.7,
    num_inference_steps: 70,
    guidance_scale: 6,
    seed: 60144,
    negative_prompt:
      '((((nude)))), (naked), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), [out of frame], extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))). out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))',
  },
  {
    prompt:
      'portrait of an adult {genre} with cat ears, cute, cherry blossom leaves on background, masterpiece, best quality',
    prompt_strength: 0.85,
    num_inference_steps: 70,
    guidance_scale: 10,
    seed: 60144,
  },
];
