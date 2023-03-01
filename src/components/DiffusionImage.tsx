import { trpc } from '@/utils/trpc';
import { useLayoutEffect, useState } from 'react';

type Props = {
  url: string;
  prompt: string;
};

export default function DiffussionImage({ url, prompt }: Props) {
  const [jobId, setJobId] = useState<string>();

  const diffusion = trpc.diffusion.create.useMutation({
    onSuccess: (data) => !!data && setJobId(data.output[0]?.image),
  });

  useLayoutEffect(() => {
    diffusion.mutate({ init_image: url, prompt });
  }, [url]);

  const { data: result } = trpc.diffusion.retrieve.useQuery();

  //   const res = await diffusion.mutateAsync({
  //     prompt: 'anima ears, lightnings on background',
  //     init_image: data.signedUrl,
  //   });

  return <img src={url} width={200} height={200} />;
}
