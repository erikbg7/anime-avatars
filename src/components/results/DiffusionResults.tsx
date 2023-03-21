import { DiffusionParams } from '@/pages/payment/[sessionId]';
import { KAWAII_PROMPTS, NARUTO_PROMPTS, SHONEN_PROMPTS } from '@/utils/prompts';
import { StaticImageData } from 'next/image';
import React from 'react';
import DownloadButton from '../DownloadButton';
import ImageModal, { ImageModalHandler } from '../landing/ImageModal';
import DiffusionStyleSection from './DiffusionStyleSection';

type Props = { diffusionParams: DiffusionParams };

// const images = [
//   'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
//   'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
//   'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
// ];

export default function DiffusionResults({ diffusionParams }: Props) {
  const [images, setImages] = React.useState<string[]>([]);
  const [finished, setFinished] = React.useState<boolean>(false);
  const imageModalRef = React.useRef<ImageModalHandler>(null);

  console.log({ images });

  const setModalImage = (image: StaticImageData | string) => imageModalRef.current?.setImage(image);

  return (
    <div>
      <h2 className="prose">
        {
          'The AI usually takes up to 5 minutes to generate all images! Be patient and leave this window opened :)'
        }
      </h2>
      <DiffusionStyleSection
        style="kawaii"
        diffusionParams={diffusionParams}
        prompts={KAWAII_PROMPTS}
        onImageClicked={(image) => setModalImage(image)}
        onImageGenerated={(image) => setImages((images) => [...images, image])}
      />
      {/* <DiffusionStyleSection
        icon="💥"
        style="shonen"
        diffusionParams={diffusionParams}
        prompts={SHONEN_PROMPTS}
        onImageClicked={(image) => setModalImage(image)}
        onImageGenerated={(image) => setImages((images) => [...images, image])}
      />
      <DiffusionStyleSection
        icon="🌀"
        style="naruto"
        diffusionParams={diffusionParams}
        prompts={NARUTO_PROMPTS}
        onImageClicked={(image) => setModalImage(image)}
        onImageGenerated={(image) => setImages((images) => [...images, image])}
      /> */}

      <ImageModal ref={imageModalRef} />

      <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-500 bg-brand p-6 text-center">
        <DownloadButton images={images} />
      </div>
    </div>
  );
}
