import { writeBinaryFile, BaseDirectory, createDir, exists, readBinaryFile, readTextFile, removeFile } from '@tauri-apps/api/fs';

import { fileConverter } from '../lib';

type SaveFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'downloads';
    fileName: string | undefined;
    fileBlob: Blob;
};

type GetFileProps = {} & Omit<SaveFileProps, 'fileBlob'>;

const useFS = () => {
    const saveFile = async (props: SaveFileProps) => {
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;

        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) await createDir(folderDir, { dir: baseDir, recursive: true });
        const arrayBuffer = await props.fileBlob.arrayBuffer();
        try {
            await writeBinaryFile(`${folderDir}/${props.fileName}`, arrayBuffer, {
                dir: baseDir,
            });
        } catch (e) {
            console.log(e);
        }
        return '';
    };
    const getFile = async (props: GetFileProps) => {
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;

        const checkPath = await exists(`${folderDir}/${props.fileName}`, { dir: baseDir });
        if (!checkPath) return null;
        const contents = await readBinaryFile(`${folderDir}/${props.fileName}`, { dir: baseDir });
        const base64 = await fileConverter.arrayBufferToBase64(contents);
        return base64;
    };

    return { saveFile, getFile };
};

export default useFS;
