import { writeBinaryFile, BaseDirectory, createDir, exists, readTextFile, removeFile } from '@tauri-apps/api/fs';

const getBase64FromUrl = async (url: any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            const base64data = reader.result;
            resolve(base64data);
        };
    });
};

const UseFileDownloads = () => {
    const save = async (url: string, name: string) => {
        const dir = BaseDirectory.Download;
        try {
            const buffer: any = await getBase64FromUrl(url);
            await writeBinaryFile(name, new Uint8Array([buffer]), {
                dir,
            });
        } catch (e) {
            console.log(e);
        }
    };
    return { save };
};

export default UseFileDownloads;
