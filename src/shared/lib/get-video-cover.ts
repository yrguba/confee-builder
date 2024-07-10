import { blobLocalPath } from './file-converter';

async function getVideoCover(base64: string, seekTo = 0.0) {
    const blob = new Promise((resolve, reject) => {
        // load the file to a video player
        const videoPlayer = document.createElement('video');
        videoPlayer.setAttribute('src', base64);
        videoPlayer.load();
        videoPlayer.addEventListener('error', (ex) => {
            // eslint-disable-next-line prefer-promise-reject-errors
            // @ts-ignore
            reject('error when loading video file', ex);
        });
        // load metadata of the video to get video duration and dimensions
        videoPlayer.addEventListener('loadedmetadata', () => {
            // seek to user defined timestamp (in seconds) if possible
            if (videoPlayer.duration < seekTo) {
                reject('video is too short.');
                return;
            }
            // delay seeking or else 'seeked' event won't fire on Safari
            setTimeout(() => {
                videoPlayer.currentTime = seekTo;
            }, 200);
            // extract video thumbnail once seeking is complete
            videoPlayer.addEventListener('seeked', () => {
                // define a canvas to have the same dimension as the video
                const canvas = document.createElement('canvas');
                canvas.width = videoPlayer.videoWidth;
                canvas.height = videoPlayer.videoHeight;
                // draw the video frame to canvas
                const ctx = canvas.getContext('2d');
                // @ts-ignore
                ctx.drawImage(videoPlayer, 0, 0, canvas.width, canvas.height);
                // return the canvas image as a blob
                // @ts-ignore
                ctx.canvas.toBlob(
                    (blob) => {
                        resolve(blob);
                    },
                    'image/jpeg',
                    0.75 /* quality */
                );
            });
        });
    });
    const res = await blob;
    return blobLocalPath(res as Blob);
}

export default getVideoCover;
