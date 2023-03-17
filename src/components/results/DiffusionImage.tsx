import { useLayoutEffect, useRef, useState } from 'react';
import { trpc } from '@/utils/trpc';
import { DiffusionRunInput } from '@/server/services/diffusion/types';

type Props = {
  url: string;
  genre: string;
  prompt: DiffusionRunInput;
  icon: string;
};

export default function DiffussionImage({ prompt, genre, url, icon }: Props) {
  const effectCalled = useRef(false);
  const [finished, setFinished] = useState(false);
  const [resultImage, setResultImage] = useState<string>();
  const diffusionStatus = trpc.diffusion.retrieve.useMutation();

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
    //   if (!finished && !effectCalled.current) {
    //     effectCalled.current = true;
    //     setTimeout(() => {
    //       diffusion.mutate(buildImagePrompt(prompt, genre, url));
    //     }, Math.random() * 1000);
    //   }
  }, [finished, genre, url]);

  if (resultImage && finished) {
    return (
      <div className="flex flex-col items-center">
        <img src={resultImage} width={200} height={200} />
        <button
          onClick={() => {
            effectCalled.current = false;
            setFinished(false);
          }}
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="relative mx-auto h-36 w-36">
      <div className="absolute bottom-0 top-0 left-0 right-0 z-10 flex flex-col items-center justify-center">
        <span className="text-border mx-4 text-2xl">{icon}</span>
        <span className="text-border">Loading...</span>
      </div>
      <img src={url} className="blur-md" />
    </div>
  );
}
