import { saveZip } from '@/utils/upload';

function DownloadButton() {
  const handleDownload = () => {
    const images = [
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
      'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg',
    ];
    saveZip('images', images);
  };

  return (
    <div id="download">
      <button onClick={handleDownload}>Zip file</button>
    </div>
  );
}

export default DownloadButton;
