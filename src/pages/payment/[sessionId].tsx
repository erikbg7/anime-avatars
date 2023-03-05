import DiffussionImage from '@/components/DiffusionImage';
import Logo from '@/components/Logo';
import Upload from '@/components/Upload';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import { trpc } from '@/utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

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

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export type DiffusionParams = {
  url: string;
  genre: string;
  description: string;
};

export default function PaymentPage(props: Props) {
  const [diffusionParams, setDiffusionParams] = useState<DiffusionParams>();
  const { data, isLoading } = trpc.payments.retrieve.useQuery({ sessionId: props.sessionId });

  if (isLoading || !data) return <div>Loading...</div>;

  if (data.isDiffusionDone) return <div>Diffusion is already done</div>;

  return (
    <main className="relative">
      <Logo />
      <Upload session_id={props.sessionId} setDiffusionParams={setDiffusionParams} />

      {!!diffusionParams && (
        <div className="flex justify-center">
          {PROMPTS.map((prompt) => (
            <DiffussionImage
              url={diffusionParams.url}
              genre={diffusionParams.genre}
              description={diffusionParams.description}
              prompt={prompt}
            />
          ))}
        </div>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.sessionId as string;

  return {
    props: {
      sessionId,
    },
  };
};
