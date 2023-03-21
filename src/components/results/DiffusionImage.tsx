import { useLayoutEffect, useRef, useState } from 'react';
import { trpc } from '@/utils/trpc';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import { buildImagePrompt } from '@/utils/prompts';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';

const ICONS: Record<string, string> = {
  kawaii: '💕',
  shonen: '💥',
  naruto: '🌀',
};

type Props = {
  url: string;
  style: string;
  genre: string;
  prompt: DiffusionRunInput['diffusion'];
  onImageClicked: (url: string) => void;
  onImageGenerated: (url: string) => void;
};

export default function DiffussionImage({
  prompt,
  genre,
  url,
  style,
  onImageClicked,
  onImageGenerated,
}: Props) {
  const effectCalled = useRef(false);
  const [finished, setFinished] = useState(false);
  const [resultImage, setResultImage] = useState<string>();

  const router = useRouter();
  const customerId = router?.query?.sessionId! as string;

  const diffusionStatus = trpc.diffusion.retrieve.useMutation({
    onError: (error) => {
      toast(error.message, { autoClose: 2000, type: 'error' });
    },
  });

  const isResultReady = finished && resultImage;

  const diffusion = trpc.diffusion.create.useMutation({
    onSuccess: async (data) => {
      if (data) {
        const jobId = data?.id;

        const intervalId = setInterval(async () => {
          const result = await diffusionStatus.mutateAsync({ jobId });
          console.log({ result: result.status });

          if (result?.status === 'COMPLETED') {
            const image = result?.output[0]?.image;
            setResultImage(image);
            setFinished(true);
            onImageGenerated(image);
            clearInterval(intervalId);
          }
        }, 2000);
      }
    },
  });

  useLayoutEffect(() => {
    if (!finished && !effectCalled.current) {
      effectCalled.current = true;
      setTimeout(() => {
        diffusion.mutate({
          customerId: customerId,
          style: 'kawaii',
          diffusion: buildImagePrompt(prompt, genre, url),
        });
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
          <span className="text-border mx-4 text-2xl">{ICONS[style]}</span>
          <span className="text-border">Loading...</span>
        </div>
      )}
      <label htmlFor="image-modal">
        <img
          onClick={handleImageClick}
          src={isResultReady ? resultImage : url}
          // className={clsx(!isResultReady && 'blur-md', 'rounded-lg')}
        />
      </label>
    </div>
  );
}
