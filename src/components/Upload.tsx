import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { trpc } from '@/utils/trpc';
import { createClient } from '@supabase/supabase-js';
import { DiffusionParams } from '@/pages/payment/[sessionId]';

type Props = { session_id: string; setDiffusionParams: (params: DiffusionParams) => void };

export default function Upload({ session_id, setDiffusionParams }: Props) {
  const [genre, setGenre] = useState<string>('woman');
  const [preview, setPreview] = useState<string>();
  const [selectedFile, setSelectedFile] = useState<File>();

  const getToken = trpc.storage.getUploadToken.useMutation();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const handleDiffusion = async () => {
    if (!selectedFile) return;
    const token = await getToken.mutateAsync({ id: session_id });
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
    const supabase = createClient(supabaseUrl, token);

    const arrayBuffer = await selectedFile.arrayBuffer();
    const blob = new Blob([arrayBuffer], { type: selectedFile.type });

    await supabase.storage.from('images').upload(session_id + '/' + selectedFile.name, blob);
    const { data, error } = await supabase.storage
      .from('images')
      .createSignedUrl(session_id + '/' + selectedFile.name, 3600);

    if (!error) {
      setDiffusionParams({ url: data.signedUrl, genre });
    }
  };

  return (
    <Layout>
      <div className="py-24">
        <div className="flex">
          <div className="flex-1">
            <PreviewImage preview={preview} />
          </div>
          <div className="flex-1">
            <Tips />
            <ImageInput setFile={setSelectedFile} />
            <div className="max-w-sm mx-auto py-6">
              <h2>You want the image to reasemble a:</h2>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Man</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-violet-500"
                    onChange={() => setGenre('man')}
                    checked={genre === 'man'}
                  />
                </label>
              </div>
              <div className="form-control">
                <label className="label cursor-pointer">
                  <span className="label-text">Woman</span>
                  <input
                    type="radio"
                    name="radio-10"
                    className="radio checked:bg-violet-500"
                    onChange={() => setGenre('woman')}
                    checked={genre === 'woman'}
                  />
                </label>
              </div>
            </div>
          </div>
        </div>
        <button className="btn btn-primary btn-block" onClick={handleDiffusion}>
          Post
        </button>
      </div>
    </Layout>
  );
}

const ImageInput = ({ setFile }: { setFile: any }) => {
  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setFile(undefined);
      return;
    }
    setFile(e.target.files[0]);
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
  return (
    <div className="max-w-lg mx-auto rounded-md overflow-hidden aspect-square">
      {preview ? (
        <img src={preview} />
      ) : (
        <img
          className="w-full h-full object-cover"
          src={
            'https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg'
          }
        />
      )}
    </div>
  );
};
