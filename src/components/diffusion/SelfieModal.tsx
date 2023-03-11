import React from 'react';
import Webcam from 'react-webcam';

type Props = {
  onCapture: (image: string) => void;
};

function SelfieModal(props: Props) {
  const webcamRef = React.useRef<any>(null);
  const capture = React.useCallback(() => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current?.getScreenshot?.();
    props.onCapture(imageSrc);
  }, [webcamRef]);

  return (
    <>
      <input type="checkbox" id="selfie-modal" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Take a selfie!</h3>
          <p className="py-4">
            <Webcam
              ref={webcamRef}
              height={1280}
              width={720}
              videoConstraints={{ facingMode: 'user' }}
            />
          </p>
          <div className="modal-action">
            <label onClick={capture} htmlFor="selfie-modal" className="btn">
              Take
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default SelfieModal;
