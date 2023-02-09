import { trpc } from '@/utils/trpc';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

export default function PaymentPage(props: Props) {
  console.log({ props });
  const { data: session } = trpc.payments.retrieve.useQuery({ sessionId: props.sessionId });

  if (!session) return <div>Loading...</div>;

  console.log({ session });

  return (
    <div>
      Payment page<div>{JSON.stringify(session)}</div>
    </div>
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
