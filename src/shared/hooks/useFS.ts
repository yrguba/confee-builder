import { writeBinaryFile, BaseDirectory, readDir, createDir, exists, readBinaryFile, removeDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';

import { fileConverter, sizeConverter } from '../lib';

type SaveFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'database' | '';
    fileName: string | undefined;
    fileBlob: Blob;
};

type SaveTextFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'database' | '';
    fileName: string | undefined;
    json: string;
};

type GetFileProps = {} & Omit<SaveFileProps, 'fileBlob'>;
type GetFolderSizeProps = {} & Omit<GetFileProps, 'fileName'>;
type DeleteFolderProps = {} & GetFolderSizeProps;
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
            await writeBinaryFile(`${folderDir}/${props.fileName.split('/').join('')}`, arrayBuffer, {
                dir: baseDir,
            });
        } catch (e) {
            console.log(e);
        }
        return '';
    };

    const saveTextFile = async (props: SaveTextFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;

        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) await createDir(folderDir, { dir: baseDir, recursive: true });
        try {
            await writeTextFile(`${folderDir}/${props.fileName.split('/').join('')}`, props.json, {
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

    const getTextFile = async (props: GetFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;

        const checkPath = await exists(`${folderDir}/${props.fileName}`, { dir: baseDir });
        if (!checkPath) return null;
        return readTextFile(`${folderDir}/${props.fileName}`, { dir: baseDir });
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
        const bytes = sizes.reduce((acc, i) => i + acc, 0);

        return {
            human: sizeConverter(bytes) || '',
            bytes,
        };
    };

    const deleteFolder = async (props: DeleteFolderProps) => {
        if (disabled) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}`;
        const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        if (!checkPath) return null;
        await removeDir(folderDir, { dir: baseDir, recursive: true });
    };

    return { saveFile, getFile, getFolderSize, deleteFolder };
};

export default useFS;
