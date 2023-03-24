import React from 'react';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import { trpc } from '@/utils/trpc';

const ICONS: Record<string, string> = {
  kawaii: '💕',
  shonen: '💥',
  naruto: '🌀',
};

type Props = {
  style: string;
  jobId: string;
  baseUrl?: string;
  onImageClicked?: (url: string) => void;
  onImageGenerated?: (url: string) => void;
};

export default function DiffussionImage({
  style,
  baseUrl,
  jobId,
  onImageClicked,
  onImageGenerated,
}: Props) {
  const [finished, setFinished] = React.useState(false);
  const [resultImage, setResultImage] = React.useState<string>();

  console.log({ resultImage });

  const { data } = trpc.diffusion.retrieve.useQuery(
    { jobId },
    {
      onError: (error) => {
        toast(error.message, { autoClose: 2000, type: 'error' });
      },
      onSuccess: (res) => {
        !!res.image && setResultImage(res.image);
      },
    }
  );

  return (
    <div className="relative mx-auto w-36">
      {!data && (
        <div className="absolute bottom-0 top-0 left-0 right-0 z-10 flex flex-col items-center justify-center">
          <span className="text-border mx-4 text-2xl">{ICONS[style]}</span>
          <span className="text-border">Loading...</span>
        </div>
      )}
      <label htmlFor="image-modal">
        <img
          // onClick={handleImageClick}
          src={data ? resultImage : baseUrl}
          className={clsx(!data && 'blur-md', 'rounded-lg')}
        />
      </label>
      <label htmlFor="image-modal">
        <input type="checkbox" id="image-modal" className="modal-toggle" />
        <div className="modal z-40 backdrop-blur-md">
          <div className="modal-box mb-12 p-0">
            <img
              src={data ? resultImage : baseUrl}
              alt="demo result modal image"
              height={1280}
              width={720}
            />
          </div>
        </div>
      </label>
    </div>
  );
}
