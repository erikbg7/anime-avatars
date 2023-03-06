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

export { convertToBase64 };
