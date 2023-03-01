import DiffussionImage from '@/components/DiffusionImage';
import Logo from '@/components/Logo';
import Upload from '@/components/Upload';
import { trpc } from '@/utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

const PROMPTS = [
  'animal ears, blossom tree leaves on the background',
  'scars on the face, lightnings on background',
  'scars on the face, lightnings on background',
  'scars on the face, lightnings on background',
  'scars on the face, lightnings on background',
];

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function PaymentPage(props: Props) {
  const [url, setUrl] = useState<string>();
  const { data, isLoading } = trpc.payments.retrieve.useQuery({ sessionId: props.sessionId });

  if (isLoading || !data) return <div>Loading...</div>;

  if (data.isDiffusionDone) return <div>Diffusion is already done</div>;

  return (
    <main className="relative">
      <Logo />
      <Upload session_id={props.sessionId} setBaseImageUrl={setUrl} />

      {!!url && (
        <div className="flex justify-center">
          {PROMPTS.map((prompt) => (
            <DiffussionImage url={url} prompt={prompt} />
          ))}
        </div>
      )}
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sessionId = context.query.sessionId as string;

  return {
    props: {
      sessionId,
    },
  };
};
