import { DiffusionParams } from '@/pages/payment/[sessionId]';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import DiffussionImage from './DiffusionImage';
import localFont from '@next/font/local';
import { buildImagePrompt } from '@/utils/prompts';

const shibuya = localFont({ src: '../../fonts/go3.ttf' });

const TITLE: Record<string, string> = {
  kawaii: 'Kawaii',
  shonen: 'Shonen',
  naruto: 'Naruto',
};

type Props = {
  style: string;
  prompts: DiffusionRunInput['diffusion'][];
  diffusionParams: DiffusionParams;
  onImageClicked: (url: string) => void;
  onImageGenerated: (url: string) => void;
};

function DiffusionStyleSection({
  style,
  prompts,
  diffusionParams,
  onImageGenerated,
  onImageClicked,
}: Props) {
  const { genre, url } = diffusionParams;
  const amount = process.env.NODE_ENV === 'development' ? 1 : 4;

  return (
    <section className="prose mx-auto mt-8">
      <h2 style={{ fontFamily: shibuya.style.fontFamily }}>{TITLE[style]}</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {prompts.slice(0, amount).map((prompt, i) => (
          <DiffussionImage
            key={i}
            style={style}
            url={diffusionParams.url}
            genre={diffusionParams.genre}
            prompt={buildImagePrompt(prompt, genre, url)}
            onImageGenerated={onImageGenerated}
            onImageClicked={onImageClicked}
          />
        ))}
      </div>
    </section>
  );
}

export default DiffusionStyleSection;
