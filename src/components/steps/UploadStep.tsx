import SelfieModal from './SelfieModal';

type Props = {
  onImageUploaded: (image: File | string) => void;
};

function UploadStep(props: Props) {
  const handleSelectedFile = (e: any) => {
    if (!!e.target.files && e.target.files.length > 0) {
      props.onImageUploaded(e.target.files[0]);
    }
  };

  return (
    <>
      <input
        type="file"
        accept="image/*"
        multiple={false}
        onChange={handleSelectedFile}
        className="file-input-bordered file-input-primary file-input mb-3 w-full md:max-w-xs"
      />

      <label htmlFor="selfie-modal" className="btn-primary btn mb-3 w-full">
        Take Selfie
      </label>

      <SelfieModal onCapture={props.onImageUploaded} />

      <div className="prose-sm px-4 text-left">
        <h2>Tips</h2>
        <p>✅ Use a portrait image of yourself.</p>
        <p>✅ The simpler composition the better results.</p>
        <p>✅ Do not upload an image of multiple people.</p>
      </div>
    </>
  );
}

export default UploadStep;
