type FormDataNames = 'images';

function getFormData(name: FormDataNames, file: File | string): FormData {
    const fd = new FormData();
    fd.append(name, typeof file === 'string' ? DataURIToBlob(file) : file);
    return fd;
}
function DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString = splitDataURI[0].indexOf('base64') >= 0 ? atob(splitDataURI[1]) : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++) ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
}
export default getFormData;
