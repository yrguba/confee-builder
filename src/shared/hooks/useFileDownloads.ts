import * as buffer from 'buffer';

import { writeBinaryFile, BaseDirectory, createDir, exists, readTextFile, removeFile } from '@tauri-apps/api/fs';

const getBase64FromUrl = async (url: any) => {
    const data = await fetch(url);
    const blob = await data.blob();
    const arrayBuffer = await blob.arrayBuffer();
    return arrayBuffer;
};

const UseFileDownloads = () => {
    const save = async (url: string, name: string) => {
        const dir = BaseDirectory.Download;
        const buffer: any = await getBase64FromUrl(url);
        try {
            await writeBinaryFile(name, buffer, {
                dir,
            });
        } catch (e) {
            console.log(e);
        }
    };
    return { save };
};

export default UseFileDownloads;
