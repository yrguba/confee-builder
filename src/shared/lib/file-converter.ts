export const fromBlobToBase64 = async (blob: Blob) => {
    const reader = new FileReader();
    await new Promise((resolve, reject) => {
        reader.onload = resolve;
        reader.onerror = reject;
        reader.readAsDataURL(blob);
    });
    return reader.result;
};

export const arrayBufferToBase64 = async (arrayBuffer: ArrayBuffer) => {
    const blob = new Blob([arrayBuffer]);
    const base64 = fromBlobToBase64(blob);
    return base64;
};

export const fromBase64ToBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const parts = b64Data.split(';base64,');
    const imageType = parts[0].split(':')[1];
    const decodedData = window.atob(parts[1]);
    const uInt8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
        uInt8Array[i] = decodedData.charCodeAt(i);
    }
    return new Blob([uInt8Array], { type: imageType });
};
