async function compressImage(blobImg: any, name: string, percent: number) {
    const bitmap = await createImageBitmap(blobImg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = bitmap.width;
    canvas.height = bitmap.height;
    // @ts-ignore
    ctx.drawImage(bitmap, 0, 0);
    const dataUrl = canvas.toDataURL('image/jpeg', percent / 100);
    return fetch(dataUrl)
        .then((res) => res.blob())
        .then((blob) => {
            return new File([blob], name, { type: 'image/jpeg' });
        });
}

export default compressImage;
