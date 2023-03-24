import React from 'react';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { trpc } from '@/utils/trpc';
import Layout from '@/components/PageLayout';
import DiffusionSteps from '@/components/steps/DiffusionSteps';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function PaymentPage(props: Props) {
  const { data, isLoading } = trpc.payments.retrieve.useQuery({ sessionId: props.sessionId });

  if (isLoading || !data) return <div>Loading...</div>;

  if (data.isDiffusionDone) return <div>Diffusion is already done</div>;

  return (
    <Layout>
      <DiffusionSteps session_id={props.sessionId} />
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
