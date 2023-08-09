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
