import { saveZip } from '@/utils/upload';

type Props = { images: string[] };

function DownloadButton({ images }: Props) {
  const handleDownload = () => saveZip('images', images);

  // Download is not working properly due to CORS issues, setting mode no-cors
  // does not work either because we cannot get the Blob from the opaque response.

  return (
    <div id="download">
      <button
        onClick={handleDownload}
        className="mx-auto flex items-center justify-center text-purple-600"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="fill-purple-600"
        >
          <title>download</title>
          <path d="M17 12v5H3v-5H1v5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5z" />
          <path d="M10 15l5-6h-4V1H9v8H5l5 6z" />
        </svg>
        <span className="ml-2 font-semibold">Download Images</span>
      </button>
    </div>
  );
}

export default DownloadButton;
