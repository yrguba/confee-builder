import { returnKeysWithValue } from './index';

type FormDataNames = 'images' | 'avatar';

function getFormData(name: FormDataNames, file: File | string): FormData {
    const fd = new FormData();
    fd.append(name, typeof file === 'string' ? dataURLtoFile(file) : file);
    return fd;
}

function objectToFormData(obj: any) {
    const updObj = returnKeysWithValue(obj);
    const fd = new FormData();

    Object.entries(updObj).forEach(([key, value]) => {
        if (key === 'avatar' && value && typeof value === 'string') {
            return fd.append(key, dataURLtoFile(value));
        }
        if (Array.isArray(value)) {
            return value.forEach((i) => fd.append(`${key}[]`, i));
        }
        if (typeof value === 'boolean') {
            return fd.append(key, value ? '1' : '0');
        }
        fd.append(key, String(value));
    });
    return fd;
}

function dataURLtoFile(url: string) {
    const arr: any = url.split(',');
    const ext = arr[0]?.split('/')[1]?.split(';')[0];
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[arr.length - 1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], `file.${ext}`, { type: mime });
}

export { getFormData, objectToFormData };
