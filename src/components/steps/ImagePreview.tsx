import React from 'react';

const INITIAL_IMAGE =
  'https://st.depositphotos.com/2218212/2938/i/600/depositphotos_29387653-stock-photo-facebook-profile.jpg';

type ImagePreviewHandler = {
  setContent: (image: string | File) => void;
  getContent: () => string | File;
};

const ImagePreview = React.forwardRef<ImagePreviewHandler>((_, ref) => {
  const [image, setImage] = React.useState<string>(INITIAL_IMAGE);
  const [file, setFile] = React.useState<File>();

  React.useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    setImage(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  React.useImperativeHandle(ref, () => ({
    getContent: () => file || image,
    setContent: (file: string | File) =>
      typeof file === 'string' ? setImage(file) : setFile(file),
  }));

  return (
    <div className="mx-6 max-w-lg overflow-hidden rounded-md">
      <img className="aspect-square h-full w-full object-cover" src={image} />
    </div>
  );
});

ImagePreview.displayName = 'ImagePreview';

export type { ImagePreviewHandler };
export default ImagePreview;
