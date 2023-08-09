import { writeBinaryFile, BaseDirectory, readDir, createDir, exists, readBinaryFile, readTextFile, removeFile } from '@tauri-apps/api/fs';

import { fileConverter, sizeConverter } from '../lib';

type SaveFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'downloads';
    fileName: string | undefined;
    fileBlob: Blob;
};

type GetFileProps = {} & Omit<SaveFileProps, 'fileBlob'>;
type GetFolderSizeProps = {} & Omit<GetFileProps, 'fileName'>;
const useFS = () => {
    const disabled = !window.__TAURI__;
    const saveFile = async (props: SaveFileProps) => {
        if (disabled) return null;
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
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;

        const checkPath = await exists(`${folderDir}/${props.fileName}`, { dir: baseDir });
        if (!checkPath) return null;
        const contents = await readBinaryFile(`${folderDir}/${props.fileName}`, { dir: baseDir });
        const base64 = await fileConverter.arrayBufferToBase64(contents);
        return base64;
    };

    const getFolderSize = async (props: GetFolderSizeProps) => {
        if (disabled) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;
        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) return null;
        const entries = await readDir(folderDir, { dir: baseDir, recursive: true });
        const sizes = await Promise.all(
            entries.map(async (file) => {
                const contents = await readBinaryFile(`${folderDir}/${file.name}`, { dir: baseDir });
                return contents.byteLength;
            })
        );
        return sizeConverter(sizes.reduce((acc, i) => i + acc, 0));
    };

    return { saveFile, getFile, getFolderSize };
};

export default useFS;
