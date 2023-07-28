type FormDataNames = 'images';

function getFormData(name: FormDataNames, file: File | string): FormData {
    const fd = new FormData();
    fd.append(name, file);
    return fd;
}

export default getFormData;
