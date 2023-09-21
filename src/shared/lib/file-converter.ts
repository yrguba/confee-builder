export const arrayBufferToBlobLocalPath = async (arrayBuffer: ArrayBuffer) => {
    const blob = new Blob([arrayBuffer]);
    return blobLocalPath(blob);
};

export const blobLocalPath = (blob: Blob) => {
    return window.URL.createObjectURL(blob);
};
