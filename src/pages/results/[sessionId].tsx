import React from 'react';
import { toast } from 'react-toastify';
import { StaticImageData } from 'next/image';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { trpc } from '@/utils/trpc';
import Layout from '@/components/PageLayout';
import DiffussionImage from '@/components/results/DiffusionImage';
import DiffusionStyleSection from '@/components/results/DiffusionStyleSection';
import ImageModal, { ImageModalHandler } from '@/components/landing/ImageModal';
import DownloadButton from '@/components/DownloadButton';

type Props = InferGetServerSidePropsType<typeof getServerSideProps>;

const baseUrl =
  'https://ogoexfvkwxcwmjqveeet.supabase.co/storage/v1/object/sign/images/cs_test_a1f5WDsJYsnwEMYKS94KEWQhWB5cw8em9TqP84iIh7aYdHv5goFhGqv2pn/template_3.jpeg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJpbWFnZXMvY3NfdGVzdF9hMWY1V0RzSllzbndFTVlLUzk0S0VXUWhXQjVjdzhlbTlUcVA4NGlJaDdhWWRIdjVnb0ZoR3F2MnBuL3RlbXBsYXRlXzMuanBlZyIsImlhdCI6MTY3OTU5OTM4MSwiZXhwIjoxNjgwMjA0MTgxfQ.1HleN12kq211MwDkCLqcZjh48gkqn8cxLSv7zj8YaR0&t=2023-03-23T19%3A23%3A01.601Z';

export default function PaymentPage(props: Props) {
  const [images, setImages] = React.useState<string[]>([]);
  const [finished, setFinished] = React.useState<boolean>(false);
  const imageModalRef = React.useRef<ImageModalHandler>(null);

  const setModalImage = (image: StaticImageData | string) => imageModalRef.current?.setImage(image);

  const { data, error } = trpc.diffusion.retrieveAll.useQuery(
    { customer_id: props.sessionId },
    {
      onError: () =>
        toast('Could not retrieve the results, try again later or contact support', {
          type: 'error',
        }),
    }
  );

  if (!data) {
    return <div>Loading...</div>;
  }

  const kawaiiResults = data.filter((r) => r.style === 'kawaii');
  const shonenResults = data.filter((r) => r.style === 'shonen');
  const narutoResults = data.filter((r) => r.style === 'naruto');

  return (
    <Layout>
      <div className="flex flex-col">
        <h2 className="prose">
          {
            'The AI usually takes up to 5 minutes to generate all images! Be patient and leave this window opened :)'
          }
        </h2>

        <DiffusionStyleSection style="kawaii">
          {kawaiiResults.map((r, i) => (
            <DiffussionImage key={i} style={r.style} jobId={r.job_id} baseUrl={baseUrl} />
          ))}
        </DiffusionStyleSection>

        <DiffusionStyleSection style="shonen">
          {shonenResults.map((r, i) => (
            <DiffussionImage key={i} style={r.style} jobId={r.job_id} baseUrl={baseUrl} />
          ))}
        </DiffusionStyleSection>

        <DiffusionStyleSection style="naruto">
          {narutoResults.map((r, i) => (
            <DiffussionImage key={i} style={r.style} jobId={r.job_id} baseUrl={baseUrl} />
          ))}
        </DiffusionStyleSection>
      </div>
      <ImageModal ref={imageModalRef} />
      <div className="fixed bottom-0 left-0 right-0 z-50 w-full border-t border-slate-500 bg-brand p-6 text-center">
        <DownloadButton images={images} />
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
