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
  const setDispatched = trpc.customer.setDispatched.useMutation();

  const onSuccess = (res: any) => console.log({ res });

  const createCustomer = trpc.customer.create.useMutation({ onSuccess });
  const addDiffusion = trpc.customer.addDiffusion.useMutation({ onSuccess });
  const getDiffusions = trpc.customer.getDiffusions.useMutation({ onSuccess });

  if (isLoading || !data) return <div>Loading...</div>;

  if (data.isDiffusionDone) return <div>Diffusion is already done</div>;

  return (
    <Layout>
      {!!diffusionParams ? (
        <DiffusionResults diffusionParams={diffusionParams} />
      ) : (
        <DiffusionSteps session_id={props.sessionId} setDiffusionParams={setDiffusionParams} />
      )}
      <div className="flex flex-col">
        <button
          onClick={() => createCustomer.mutate({ id: props.sessionId, email: 'test@gmail.com' })}
        >
          Create customer
        </button>
        <button onClick={() => addDiffusion.mutate({ customer_id: props.sessionId })}>
          Add diffusion
        </button>
        <button onClick={() => getDiffusions.mutate({ customer_id: props.sessionId })}>
          Get Diffusions
        </button>
      </div>
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
