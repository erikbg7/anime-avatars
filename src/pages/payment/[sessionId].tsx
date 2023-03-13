import DiffusionGrid from '@/components/DiffusionGrid';
import DiffussionImage from '@/components/DiffusionImage';
import Logo from '@/components/Logo';
import Upload from '@/components/Upload';
import { DiffusionRunInput } from '@/server/services/diffusion/types';
import { KAWAII_PROMPTS, NARUTO_PROMPTS, SHONEN_PROMPTS } from '@/utils/prompts';
import { trpc } from '@/utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useState } from 'react';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export type DiffusionParams = {
  url: string;
  genre: string;
  description: string;
};

export default function PaymentPage(props: Props) {
  const [diffusionParams, setDiffusionParams] = useState<DiffusionParams>();
  const { data, isLoading } = trpc.payments.retrieve.useQuery({ sessionId: props.sessionId });

  if (isLoading || !data) return <div>Loading...</div>;

  if (data.isDiffusionDone) return <div>Diffusion is already done</div>;

  return (
    <main className="relative">
      <Logo />
      <Upload session_id={props.sessionId} setDiffusionParams={setDiffusionParams} />

      {!!diffusionParams && (
        <DiffusionGrid url={diffusionParams.url} genre={diffusionParams.genre} />
        // <>
        //   <DiffusionStyleSection
        //     title="Kawaii Style"
        //     diffusionParams={diffusionParams}
        //     prompts={KAWAII_PROMPTS}
        //   />
        //   <DiffusionStyleSection
        //     title="Shonen Style"
        //     diffusionParams={diffusionParams}
        //     prompts={SHONEN_PROMPTS}
        //   />
        //   <DiffusionStyleSection
        //     title="Naruto Style"
        //     diffusionParams={diffusionParams}
        //     prompts={NARUTO_PROMPTS}
        //   />
        // </>
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

const DiffusionStyleSection = ({
  prompts,
  title,
  diffusionParams,
}: {
  prompts: DiffusionRunInput[];
  diffusionParams: DiffusionParams;
  title: string;
}) => {
  return (
    <section className="prose mx-auto max-w-[70%]">
      <h2>{title}</h2>
      <div className="flex justify-center">
        {prompts.map((prompt, i) => (
          <DiffussionImage
            key={i}
            url={diffusionParams.url}
            genre={diffusionParams.genre}
            description={diffusionParams.description}
            prompt={prompt}
          />
        ))}
      </div>
    </section>
  );
};
