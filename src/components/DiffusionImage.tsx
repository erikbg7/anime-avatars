import { useLayoutEffect, useRef, useState } from 'react';
import { trpc } from '@/utils/trpc';
import { DiffusionRunInput } from '@/server/services/diffusion/types';

type Props = {
  url: string;
  genre: string;
  prompt: DiffusionRunInput;
};

export default function DiffussionImage({ url, genre, prompt }: Props) {
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
          console.log({ result: result?.status, o: result?.output });
          return result;
        };

        await poll();
      }
    },
  });

  useLayoutEffect(() => {
    if (!finished && !effectCalled.current) {
      const { prompt: rawPrompt, ...config } = prompt;
      effectCalled.current = true;
      diffusion.mutate({
        init_image: url,
        prompt: rawPrompt.replace('{genre}', genre),
        ...config,
      });
    }
  }, [url, finished]);

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
    <div>
      <img src={url} width={200} height={200} className="blur-md" />
    </div>
  );
}
