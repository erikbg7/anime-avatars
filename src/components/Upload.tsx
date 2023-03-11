import React from 'react';
import { trpc } from '@/utils/trpc';
import { createClient } from '@supabase/supabase-js';
import { DiffusionParams } from '@/pages/payment/[sessionId]';
import Layout from '@/components/PageLayout';
import GenreInput from './diffusion/GenreInput';
import SelfieModal from './diffusion/SelfieModal';
import { getStorageParams } from '@/utils/upload';

type Props = { session_id: string; setDiffusionParams: (params: DiffusionParams) => void };

export default function Upload({ session_id, setDiffusionParams }: Props) {
  const [genre, setGenre] = React.useState<string>('woman');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [preview, setPreview] = React.useState<string>();
  const [selectedFile, setSelectedFile] = React.useState<File>();

  const getToken = trpc.storage.getUploadToken.useMutation();

  React.useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleTakenSelfie = (image: string) => {
    setPreview(image);
    setSelectedFile(undefined);
  };

  const handleDiffusion = async () => {
    const content = selectedFile || preview;
    if (!content) return;

    setLoading(true);

    const token = await getToken.mutateAsync({ id: session_id });
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabase = createClient(supabaseUrl, token);

    const { file, path, options } = getStorageParams(session_id, content);
    await supabase.storage.from('images').upload(path, file, options);

    const { data, error } = await supabase.storage.from('images').createSignedUrl(path, 3600);
    console.log({ data });

    // if (!error) {
    //   setDiffusionParams({ url: data.signedUrl, genre, description });
    // }

    setLoading(false);
  };

  return (
    <Layout>
      <div className="py-24">
        <div className="flex flex-col md:flex-row">
          <div className="flex-1">
            <PreviewImage preview={preview} />
          </div>
          <div className="flex-1">
            <Tips />
            <ImageInput setFile={setSelectedFile} />
            <label htmlFor="selfie-modal" className="btn btn-primary">
              Take Selfie
            </label>
            <SelfieModal onCapture={handleTakenSelfie} />
            <GenreInput genre={genre} onGenreChange={setGenre} />
          </div>
        </div>
        <button disabled={loading} className="btn btn-primary btn-block" onClick={handleDiffusion}>
          {loading ? 'Loading' : 'Post'}
        </button>
      </div>
    </Layout>
  );
}

const ImageInput = ({ setFile }: { setFile: any }) => {
  const onSelectFile = (e: any) => {
    if (!!e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <input
      type="file"
      accept="image/*"
      multiple={false}
      onChange={onSelectFile}
      className="file-input file-input-bordered file-input-primary w-full max-w-xs"
    />
  );
};

const Tips = () => {
  return (
    <div className="prose text-left px-4">
      <h2>Tips</h2>
      <p>✅ Use a portrait image where you can be clearly identified.</p>
      <p>✅ Do not upload multiple people, it is build to handle a single person.</p>
    </div>
  );
};

const PreviewImage = ({ preview }: { preview?: string }) => {
  const placeholder =
    'https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg';

  return (
    <div className="max-w-lg mx-auto rounded-md overflow-hidden aspect-square">
      <img className="w-full h-full object-cover" src={preview || placeholder} />
    </div>
  );
};

// SEE RESULTS button, will open a model where the images are shown bigger with better quality
