import { DiffusionRunInput } from '@/server/services/diffusion/types';
import DiffussionImage from './DiffusionImage';

const buildPrompt = (
  cfg: DiffusionRunInput['guidance_scale'],
  strength: DiffusionRunInput['prompt_strength'],
  scheduler: DiffusionRunInput['scheduler'],
  steps?: DiffusionRunInput['num_inference_steps']
) => {
  return {
    prompt:
      'portrait of an adult {genre} with 2 animal ears in a cherry blossom tree background, kawaii anime style, masterpiece, high quality',
    prompt_strength: strength,
    num_inference_steps: steps || 40,
    guidance_scale: cfg,
    scheduler: scheduler,
    negative_prompt:
      'nsfw, nude, naked, (ugly:1.3), (fused fingers), (too many fingers), (bad anatomy:1.5), (watermark:1.5), (words), letters, untracked eyes, asymmetric eyes, floating head, (logo:1.5), (bad hands:1.3), (mangled hands:1.2), (missing hands), (missing arms), backward hands, floating jewelry, unattached jewelry, floating head, doubled head, unattached head, doubled head, head in body, (misshapen body:1.1), (badly fitted headwear:1.2), floating arms, (too many arms:1.5), limbs fused with body, (facial blemish:1.5), badly fitted clothes, imperfect eyes, untracked eyes, crossed eyes, hair growing from clothes, partial faces, hair not attached to head',
  };
};

const gridPrompts: DiffusionRunInput[] = [
  buildPrompt(10, 0.85, 'EULER-A', 20),
  buildPrompt(10, 0.85, 'EULER-A', 30),
  buildPrompt(10, 0.85, 'EULER-A', 40),
  buildPrompt(10, 0.85, 'EULER-A', 50),
];

type Props = { url: string; genre: string };

function DiffusionGrid({ url, genre }: Props) {
  return (
    <div className="grid grid-cols-4">
      {gridPrompts.map((p, i) => (
        <div key={i} className="flex flex-col items-center">
          <DiffussionImage url={url} genre={genre} prompt={p} description={''} />
          <div>
            CFG: {p.guidance_scale} - Strength: {p.prompt_strength}
          </div>
          <div>Steps: {p.num_inference_steps}</div>
        </div>
      ))}
    </div>
  );
}

export default DiffusionGrid;
