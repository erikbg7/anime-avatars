import { useLayoutEffect, useRef, useState } from 'react';
import { trpc } from '@/utils/trpc';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import { buildImagePrompt } from '@/utils/prompts';
import clsx from 'clsx';

type Props = {
  url: string;
  genre: string;
  prompt: DiffusionRunInput;
  icon: string;
  onImageClicked: (url: string) => void;
  onImageGenerated: (url: string) => void;
};

export default function DiffussionImage({
  prompt,
  genre,
  url,
  icon,
  onImageClicked,
  onImageGenerated,
}: Props) {
  const effectCalled = useRef(false);
  const [finished, setFinished] = useState(false);
  const [resultImage, setResultImage] = useState<string>();
  const diffusionStatus = trpc.diffusion.retrieve.useMutation();

  const isResultReady = finished && resultImage;

  const diffusion = trpc.diffusion.create.useMutation({
    onSuccess: async (data) => {
      if (data) {
        const jobId = data?.id;

        const poll = async () => {
          const result = await diffusionStatus.mutateAsync({ jobId });

          if (result?.status === 'IN_PROGRESS' || result?.status === 'IN_QUEUE') {
            setTimeout(poll, 2000);
          }
          if (result?.status === 'COMPLETED') {
            const image = result?.output[0]?.image;
            setResultImage(image);
            setFinished(true);
            onImageGenerated(image);
          }

          if (result?.status === 'FAILED') {
            // Show toast, user wont be charged, try again later
          }

          console.log({ result: result?.status, o: result?.output });
          return result;
        };

        await poll();
      }
    },
  });

  useLayoutEffect(() => {
    if (!finished && !effectCalled.current) {
      effectCalled.current = true;
      setTimeout(() => {
        diffusion.mutate(buildImagePrompt(prompt, genre, url));
      }, Math.random() * 1000);
    }
  }, [finished, genre, url]);

  const handleImageClick = () => {
    if (!isResultReady) return;
    onImageClicked(resultImage);
  };

  return (
    <div className="relative mx-auto w-36">
      {!isResultReady && (
        <div className="absolute bottom-0 top-0 left-0 right-0 z-10 flex flex-col items-center justify-center">
          <span className="text-border mx-4 text-2xl">{icon}</span>
          <span className="text-border">Loading...</span>
        </div>
      )}
      <label htmlFor="image-modal">
        <img
          onClick={handleImageClick}
          src={isResultReady ? resultImage : url}
          className={clsx(!isResultReady && 'blur-md', 'rounded-lg')}
        />
      </label>
    </div>
  );
}
