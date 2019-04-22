export const b64toBlob = (base64: string) => {


  const block = base64.split(';');
  // Get the content type of the image
  let contentType = block[0].split(':')[1]; // In this case "image/gif"
  // get the real base64 content of the file
  const b64Data = block[1].split(',')[1]; // In this case "R0lGODlhPQBEAPeoAJosM...."

  contentType = contentType || '';
  const sliceSize = 512;

  const byteCharacters = atob(b64Data);
  const byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize);

    const byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  const blob = new Blob(byteArrays, { type: contentType });
  return blob;
};
