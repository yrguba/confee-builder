import { writeBinaryFile, BaseDirectory, readDir, createDir, exists, readBinaryFile, removeDir, readTextFile, writeTextFile } from '@tauri-apps/api/fs';
import { appDataDir, join, documentDir } from '@tauri-apps/api/path';
import { convertFileSrc } from '@tauri-apps/api/tauri';
import { metadata } from 'tauri-plugin-fs-extra-api';

import { fileConverter, sizeConverter } from '../lib';

export type FileTypes = 'img' | 'video' | 'document' | 'audio' | 'text';

type SaveFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'database' | '';
    fileName: string | undefined;
    fileBlob: Blob;
    fileType?: FileTypes;
};

type SaveTextFileProps = {
    baseDir: 'Download' | 'Document';
    folderDir: 'cache' | 'database' | '';
    fileName: string | undefined;
    json: string;
};

type GetFileProps = {} & Omit<SaveFileProps, 'fileBlob'>;
type GetTextFileProps = {} & Omit<SaveTextFileProps, 'json'>;
type GetFolderSizeProps = {
    folderInDock: 'cache' | 'database';
    folderInCache?: 'audio' | 'img' | 'video';
};
type DeleteFolderProps = {} & GetFolderSizeProps;

const useFS = () => {
    const disabled = !window.__TAURI__;

    const saveFile = async (props: SaveFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}${props.fileType ? `/${props.fileType}` : ''}`;

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
        const folderDir: any = `Confee/${props.folderDir}/json`;

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

    const getFileUrl = async (props: GetFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const fileName = props.fileName.split('/').join('');
        const docDir = await documentDir();
        const filePath = await join(docDir, 'Confee', props.folderDir, props.fileType ? props.fileType : '', fileName);
        const checkPath = await exists(filePath);
        if (!checkPath) return null;
        return convertFileSrc(filePath);
    };

    const getTextFile = async (props: GetTextFileProps) => {
        if (disabled) return null;
        if (!props.fileName) return null;
        const baseDir: any = BaseDirectory[props.baseDir];
        const folderDir: any = `Confee/${props.folderDir}/json`;

        const checkPath = await exists(`${folderDir}/${props.fileName}`, { dir: baseDir });
        if (!checkPath) return null;
        return readTextFile(`${folderDir}/${props.fileName}`, { dir: baseDir });
    };

    const getFolderSize = async (props: GetFolderSizeProps) => {
        if (disabled) return null;
        const docDir = await documentDir();
        const filePath = await join(docDir, 'Confee', props.folderInDock, `${props.folderInCache ? props.folderInCache : ''}`);
        const checkPath = await exists(filePath);
        if (!checkPath) return null;
        const a = await metadata(filePath);
        console.log(a);
        console.log(filePath);
    };

    const deleteFolder = async (props: DeleteFolderProps) => {
        if (disabled) return null;
        // const baseDir: any = BaseDirectory[props.baseDir];
        // const folderDir: any = `Confee/${props.folderDir}`;
        // const checkPath = await exists(`${folderDir}`, { dir: baseDir });
        // if (!checkPath) return null;
        // await removeDir(folderDir, { dir: baseDir, recursive: true });
    };

    return { saveFile, saveTextFile, getFileUrl, getTextFile, getFolderSize, deleteFolder };
};

export default useFS;
