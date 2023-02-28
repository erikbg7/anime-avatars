import { useEffect, useState } from 'react';
import Layout from '@/components/layout';
import { trpc } from '@/utils/trpc';

export default function Upload() {
  const [preview, setPreview] = useState<string>();
  const diffusion = trpc.diffusion.create.useMutation();
  // const { data: result } = trpc.diffusion.retrieve.useQuery();

  const handleDiffusion = async () => {
    const res = await diffusion.mutateAsync({
      prompt: 'anima ears, lightnings on background',
      init_image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Portrait_of_a_woman_made_by_Stable_Diffusion.webp/512px-Portrait_of_a_woman_made_by_Stable_Diffusion.webp.png',
    });
    console.log({ res });
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
            <ImageInput setImage={setPreview} />
          </div>
        </div>
        <button className="btn btn-primary btn-block" onClick={handleDiffusion}>
          Post
        </button>
      </div>
    </Layout>
  );
}

const ImageInput = ({ setImage }: { setImage: (preview?: string) => void }) => {
  const [selectedFile, setSelectedFile] = useState<Blob | MediaSource>();

  const onSelectFile = (e: any) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }
    setSelectedFile(e.target.files[0]);
  };

  useEffect(() => {
    if (!selectedFile) {
      setImage(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

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
