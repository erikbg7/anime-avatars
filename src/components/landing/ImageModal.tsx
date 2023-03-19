import React, { forwardRef, useImperativeHandle, useState } from 'react';
import Image, { StaticImageData } from 'next/image';

type Props = {};

type ImageModalHandler = {
  setImage: (image: StaticImageData | string) => void;
};

const ImageModal = forwardRef<ImageModalHandler, Props>((props, ref) => {
  const [currentImage, setCurrentImage] = useState<StaticImageData | string | undefined>();

  useImperativeHandle(ref, () => ({
    setImage: (image: StaticImageData | string) => setCurrentImage(image),
  }));

  return (
    <label htmlFor="image-modal">
      <input type="checkbox" id="image-modal" className="modal-toggle" />
      <div className="modal z-40 backdrop-blur-md">
        <div className="modal-box mb-12 p-0">
          {currentImage &&
            (typeof currentImage === 'string' ? (
              <img src={currentImage} alt="demo result modal image" height={1280} width={720} />
            ) : (
              <Image src={currentImage} alt="demo result modal image" height={1280} width={720} />
            ))}
        </div>
      </div>
    </label>
  );
});

ImageModal.displayName = 'ImageModal';

export default ImageModal;
export type { ImageModalHandler };
