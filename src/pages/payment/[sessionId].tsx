import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import DiffusionSteps from '@/components/steps/DiffusionSteps';
import DiffusionResults from '@/components/results/DiffusionResults';

import { trpc } from '@/utils/trpc';
import Layout from '@/components/PageLayout';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;
export type DiffusionParams = {
  url: string;
  genre: string;
};

export default function PaymentPage(props: Props) {
  const [diffusionParams, setDiffusionParams] = React.useState<DiffusionParams>();
  const { data, isLoading } = trpc.payments.retrieve.useQuery({ sessionId: props.sessionId });

  if (isLoading || !data) return <div>Loading...</div>;

  if (data.isDiffusionDone) return <div>Diffusion is already done</div>;

  return (
    <Layout>
      {!!diffusionParams ? (
        <DiffusionResults diffusionParams={diffusionParams} />
      ) : (
        <DiffusionSteps session_id={props.sessionId} setDiffusionParams={setDiffusionParams} />
      )}
    </Layout>
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
