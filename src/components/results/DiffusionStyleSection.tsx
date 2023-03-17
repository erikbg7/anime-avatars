import { DiffusionParams } from '@/pages/payment/[sessionId]';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import DiffussionImage from './DiffusionImage';

type Props = {
  prompts: DiffusionRunInput[];
  diffusionParams: DiffusionParams;
  title: string;
  icon: string;
};

function DiffusionStyleSection({ prompts, title, diffusionParams, icon }: Props) {
  const amount = process.env.NODE_ENV === 'development' ? 2 : 4;

  return (
    <section className="prose mx-auto">
      <h2>{title}</h2>
      <div className="grid grid-cols-2 md:grid-cols-4">
        {prompts.slice(0, amount).map((prompt, i) => (
          <DiffussionImage
            key={i}
            url={diffusionParams.url}
            genre={diffusionParams.genre}
            prompt={prompt}
            icon={icon}
          />
        ))}
      </div>
    </section>
  );
}

export default DiffusionStyleSection;
