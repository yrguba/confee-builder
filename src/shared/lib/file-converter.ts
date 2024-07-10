import { FileTypes } from '../hooks/useFS';

export const arrayBufferToBlobLocalPath = (arrayBuffer: ArrayBuffer, fileType: FileTypes) => {
    const dictionary: Record<string, string> = {
        audio: 'audio/ogg',
        video: 'video/mp4',
        img: 'image/jpeg',
    };
    const blob = new Blob([arrayBuffer], { type: dictionary[fileType] });
    return blobLocalPath(blob);
};

export const blobLocalPath = (blob: Blob) => {
    return window.URL.createObjectURL(blob);
};
