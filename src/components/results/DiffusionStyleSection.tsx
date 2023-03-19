import { DiffusionParams } from '@/pages/payment/[sessionId]';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import DiffussionImage from './DiffusionImage';

type Props = {
  prompts: DiffusionRunInput[];
  diffusionParams: DiffusionParams;
  title: string;
  icon: string;
  onImageClicked: (url: string) => void;
  onImageGenerated: (url: string) => void;
};

function DiffusionStyleSection({
  prompts,
  title,
  diffusionParams,
  icon,
  onImageGenerated,
  onImageClicked,
}: Props) {
  const amount = process.env.NODE_ENV === 'development' ? 2 : 4;

  return (
    <section className="prose mx-auto mt-8">
      <h2>{title}</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {prompts.slice(0, amount).map((prompt, i) => (
          <DiffussionImage
            key={i}
            url={diffusionParams.url}
            genre={diffusionParams.genre}
            prompt={prompt}
            icon={icon}
            onImageGenerated={onImageGenerated}
            onImageClicked={onImageClicked}
          />
        ))}
      </div>
    </section>
  );
}

export default DiffusionStyleSection;
