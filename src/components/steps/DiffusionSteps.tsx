import React from 'react';
import { trpc } from '@/utils/trpc';
import { createClient } from '@supabase/supabase-js';
import { DiffusionParams } from '@/pages/payment/[sessionId]';
import Layout from '@/components/PageLayout';
import GenreInput, { GenreInputHandler } from './GenreInput';
import { getStorageParams } from '@/utils/upload';
import ImagePreview, { ImagePreviewHandler } from './ImagePreview';
import UploadStep from './UploadStep';

const STEPS = {
  GENRE: 'genre',
  UPLOAD: 'upload',
  RESULTS: 'results',
} as const;

type StepKey = keyof typeof STEPS;
type Step = (typeof STEPS)[StepKey];

type Props = { session_id: string; setDiffusionParams: (params: DiffusionParams) => void };

function DiffusionSteps({ session_id, setDiffusionParams }: Props) {
  const [step, setStep] = React.useState<Step>(STEPS.UPLOAD);
  const [loading, setLoading] = React.useState<boolean>(false);
  const genreInputRef = React.useRef<GenreInputHandler>(null);
  const imagePreviewRef = React.useRef<ImagePreviewHandler>(null);

  const getToken = trpc.storage.getUploadToken.useMutation();

  const handlePreviewChange = (previewContent: string | File) => {
    imagePreviewRef.current?.setContent(previewContent);
    setStep(STEPS.GENRE);
  };

  const handleDiffusion = async () => {
    const genre = genreInputRef.current?.getGenre();
    const content = imagePreviewRef.current?.getContent();

    if (!content || !genre) return;

    setLoading(true);

    const token = await getToken.mutateAsync({ id: session_id });
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabase = createClient(supabaseUrl, token);

    const { file, path, options } = getStorageParams(session_id, content);
    await supabase.storage.from('images').upload(path, file, options);

    const { data, error } = await supabase.storage.from('images').createSignedUrl(path, 3600);

    if (!error) {
      setDiffusionParams({ url: data.signedUrl, genre });
    }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="py-20">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <ImagePreview ref={imagePreviewRef} />
          </div>
          {step === STEPS.UPLOAD && (
            <div className="flex-1">
              <UploadStep onImageUploaded={handlePreviewChange} />
            </div>
          )}
          {step === STEPS.GENRE && (
            <div className="flex-1">
              {step === STEPS.GENRE && (
                <div className="flex-1">
                  <GenreInput ref={genreInputRef} />
                  <button
                    disabled={loading}
                    className="btn-primary btn-block btn"
                    onClick={handleDiffusion}
                  >
                    {loading ? 'Loading' : 'Post'}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default DiffusionSteps;
