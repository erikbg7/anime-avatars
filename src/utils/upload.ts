import JSZip from 'jszip';

const getStorageParams = (sessionId: string, content: File | string) => {
  if (typeof content === 'string') {
    const [_, b64] = content!.split(',');
    return {
      path: `${sessionId}/${Date.now()}.webp`,
      file: Buffer.from(b64!, 'base64'),
      options: { contentType: 'image/webp' },
    };
  } else {
    return {
      path: `${sessionId}/${content.name}`,
      file: content,
    };
  }
};

const convertToBase64 = async (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsDataURL(blob);

    fileReader.onloadend = () => {
      resolve(fileReader.result as string);
    };

    fileReader.onerror = (error) => {
      reject('');
    };
  });
};

const saveZip = (filename: string, urls: string[]) => {
  if (!urls) return;

  const zip = new JSZip();
  const folder = zip.folder(filename); // folder name where all files will be placed in

  urls.forEach((url, index) => {
    const blobPromise = fetch(url).then((r) => {
      if (r.status === 200) return r.blob();
      return Promise.reject(new Error(r.statusText));
    });
    const name = index.toString().concat(url.substring(url.lastIndexOf('/') + 1));
    folder && folder.file(name, blobPromise);
  });

  zip.generateAsync({ type: 'blob' }).then((blob) => saveAs(blob, filename));
};

const saveAs = (blob: Blob, filename: string) => {
  let download = document.getElementById('download');
  if (!download) {
    console.error('Error: no download section is present');
    return;
  }
  let a = document.createElement('a');
  a.hidden = true;
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  download.appendChild(a);
  a.click();
};

export { convertToBase64, getStorageParams, saveZip };
